import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Rect, Line, Text as SvgText, Polygon } from 'react-native-svg';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { AstNode } from 'regexp-tree/ast';

type ASTNode =
  | { type: 'Char'; value: string }
  | { type: 'Concat'; children: ASTNode[] }
  | { type: 'Alternation'; left: ASTNode; right: ASTNode }
  | { type: 'Repetition'; quantifier: string; child: ASTNode }
  | { type: 'CharacterClass'; value: string }
  | { type: 'Assertion'; kind: 'start' | 'end' | 'word'; value?: string }
  | { type: 'Dot' }
  | { type: 'Group'; expression: ASTNode }
  | { type: 'Quantifier'; kind: string; from: number; to?: number; greedy: boolean; expression: ASTNode };

const BOX_WIDTH = 100;
const BOX_HEIGHT = 40;
const H_SPACING = 80;
const V_SPACING = 80;
const ARROW_SIZE = 8;

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const drawArrow = (
  elements: React.ReactElement[],
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  key: string
) => {
  const arrowLength = ARROW_SIZE;
  const arrowWidth = ARROW_SIZE * 0.7;

  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);
  if (length === 0) return;

  const ux = dx / length;
  const uy = dy / length;

  const baseX = x2 - ux * arrowLength;
  const baseY = y2 - uy * arrowLength;

  const leftX = baseX + uy * (arrowWidth / 2);
  const leftY = baseY - ux * (arrowWidth / 2);

  const rightX = baseX - uy * (arrowWidth / 2);
  const rightY = baseY + ux * (arrowWidth / 2);

  const points = `${x2},${y2} ${leftX},${leftY} ${rightX},${rightY}`;
  elements.push(<Polygon key={`arrow-${key}`} points={points} fill="black" />);
};

const drawBox = (
  elements: React.ReactElement[],
  label: string,
  x: number,
  y: number,
  key: string
) => {
  elements.push(
    <Rect
      key={`rect-${key}`}
      x={x}
      y={y}
      width={BOX_WIDTH}
      height={BOX_HEIGHT}
      fill="#cfe3ff"
      stroke="#000"
      strokeWidth={2}
      rx={8}
      ry={8}
    />
  );
  elements.push(
    <SvgText
      key={`text-${key}`}
      x={x + BOX_WIDTH / 2}
      y={y + BOX_HEIGHT / 2 + 5}
      fontSize={14}
      fontWeight="600"
      textAnchor="middle"
      fill="#000"
    >
      {label}
    </SvgText>
  );
};

const drawLine = (
  elements: React.ReactElement[],
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  key: string,
  withArrow = true
) => {
  elements.push(
    <Line
      key={`line-${key}`}
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#000"
      strokeWidth={2}
    />
  );
  if (withArrow) {
    drawArrow(elements, x1, y1, x2, y2, key);
  }
};

const renderNode = (
  node: ASTNode,
  x: number,
  y: number,
  elements: React.ReactElement[]
): { x: number; y: number } => {
  const key = `${node.type}-${x}-${y}`;

  let label = '';
  switch (node.type) {
    case 'Char':
      label = node.value;
      break;
    case 'CharacterClass':
      label = `[${node.value}]`;
      break;
    case 'Assertion':
      if (node.kind === 'start') label = '^';
      else if (node.kind === 'end') label = '$';
      else if (node.kind === 'word') label = '\\b';
      break;
    case 'Dot':
      label = '.';
      break;
    case 'Repetition':
      label = node.quantifier;
      break;
    case 'Alternation':
      label = '|';
      break;
    case 'Concat':
      label = '·';
      break;
    case 'Group':
      label = '(...)';
      break;
    case 'Quantifier':
      label = `${node.from},${node.to ?? ''}${node.greedy ? '' : '?'}`;
      break;
    default:
      label = (node as AstNode).type;
  }

  drawBox(elements, label, x, y, key);
  const centerY = y + BOX_HEIGHT / 2;
  const rightX = x + BOX_WIDTH;

  // Entradas/salidas básicas
  drawLine(elements, x - H_SPACING / 2, centerY, x, centerY, `in-${key}`);
  drawLine(elements, rightX, centerY, rightX + H_SPACING / 2, centerY, `out-${key}`);

  if (node.type === 'Concat') {
    let currX = x;
    node.children.forEach((child, i) => {
      const res = renderNode(child, currX, y, elements);
      currX = res.x;
    });
    return { x: currX + H_SPACING / 2, y };
  }

  if (node.type === 'Alternation') {
    const topY = y - V_SPACING;
    const bottomY = y + V_SPACING;
    const branchX = rightX + H_SPACING / 2;
    const endX = branchX + H_SPACING;

    const leftRes = renderNode(node.left, endX, topY, elements);
    const rightRes = renderNode(node.right, endX, bottomY, elements);

    return { x: Math.max(leftRes.x, rightRes.x) + H_SPACING / 2, y };
  }

  if (node.type === 'Repetition') {
    return renderNode(node.child, rightX + H_SPACING, y, elements);
  }

  if (node.type === 'Group') {
    return renderNode(node.expression, rightX + H_SPACING, y, elements);
  }

  if (node.type === 'Quantifier') {
    return renderNode(node.expression, rightX + H_SPACING, y, elements);
  }

  return { x: rightX + H_SPACING, y };
};

const RailroadDiagram = ({ ast }: { ast: ASTNode }) => {
  const elements: React.ReactElement[] = [];
  const startX = 50;
  const startY = 150;
  const { x: maxX } = renderNode(ast, startX, startY, elements);

  const svgWidth = Math.max(maxX + 100, 1000);
  const svgHeight = 400;

  const scale = useSharedValue(0.5);
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const savedTranslationX = useSharedValue(0);
  const savedTranslationY = useSharedValue(0);

  const pinchGesture = Gesture.Pinch().onUpdate((e) => {
    scale.value = e.scale;
  });

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translationX.value = savedTranslationX.value + e.translationX;
      translationY.value = savedTranslationY.value + e.translationY;
    })
    .onEnd(() => {
      savedTranslationX.value = translationX.value;
      savedTranslationY.value = translationY.value;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translationX.value },
      { translateY: translationY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <View style={styles.container}>
      <GestureDetector gesture={Gesture.Simultaneous(pinchGesture, panGesture)}>
        <AnimatedSvg width={svgWidth} height={svgHeight} style={animatedStyle}>
          {elements}
        </AnimatedSvg>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RailroadDiagram;
