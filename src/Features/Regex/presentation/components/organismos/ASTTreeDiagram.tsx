import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';
import {
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

type ASTNode =
  | { type: 'Char'; value: string }
  | { type: 'Concat'; children: ASTNode[] }
  | { type: 'Alternation'; left: ASTNode; right: ASTNode }
  | { type: 'Repetition'; quantifier: string; child: ASTNode }
  | { type: 'CharacterClass'; value: string }
  | { type: 'Assertion'; kind: string };
const NODE_RADIUS = 20;
const H_SPACING = 100;
const V_SPACING = 80;

type RenderResult = {
  index: number;
  maxX: number;
  maxY: number;
};

const renderNode = (
  node: ASTNode,
  x: number,
  y: number,
  index: number,
  depth: number,
  lines: React.ReactElement[],
  nodes: React.ReactElement[]
): RenderResult => {
  let nodeLabel = '';
  let hasChildren = false;

  switch (node.type) {
    case 'Char':
      nodeLabel = node.value;
      break;

    case 'CharacterClass':
      nodeLabel = node.value;
      break;

    case 'Concat':
      nodeLabel = '·';
      hasChildren = true;
      break;

    case 'Alternation':
      nodeLabel = '|';
      hasChildren = true;
      break;

    case 'Repetition':
      nodeLabel = node.quantifier || '*';
      hasChildren = true;
      break;

    case 'Assertion':
      // Las assertions más comunes: \b (word), ^ (start), $ (end)
      if (node.kind === 'word') nodeLabel = '\\b';
      else if (node.kind === 'start') nodeLabel = '^';
      else if (node.kind === 'end') nodeLabel = '$';
      else if (node.kind === 'lookahead') nodeLabel = 'Lookahead';
      else if (node.kind === 'lookbehind') nodeLabel = 'Lookbehind';
      else nodeLabel = 'Assert';
      break;

    default:
      nodeLabel = (node as ASTNode).type;
      console.warn('Nodo no reconocido:', (node as ASTNode).type);
      break;
  }

  // Dibuja el nodo (círculo + texto)
  nodes.push(
    <Circle key={`circle-${index}`} cx={x} cy={y} r={NODE_RADIUS} fill={node.type === 'Assertion' ? '#f9d342' : '#add8e6'} />
  );
  nodes.push(
    <SvgText
      key={`text-${index}`}
      x={x}
      y={y + 5}
      fontSize="12"
      textAnchor="middle"
      fill="black"
    >
      {nodeLabel}
    </SvgText>
  );

  let maxX = x;
  let maxY = y;

  const updateMax = (newX: number, newY: number) => {
    if (newX > maxX) maxX = newX;
    if (newY > maxY) maxY = newY;
  };

  const addLine = (toX: number, toY: number) => {
    lines.push(
      <Line
        key={`line-${index}-${toX}-${toY}`}
        x1={x}
        y1={y + NODE_RADIUS}
        x2={toX}
        y2={toY - NODE_RADIUS}
        stroke="black"
      />
    );
    updateMax(toX, toY);
  };

  if (hasChildren) {
    if (node.type === 'Concat') {
      const baseX = x - ((node.children.length - 1) * H_SPACING) / 2;
      node.children.forEach((child, i) => {
        const childX = baseX + i * H_SPACING;
        const childY = y + V_SPACING;
        addLine(childX, childY);
        const res = renderNode(child, childX, childY, index + 1, depth + 1, lines, nodes);
        index = res.index;
        updateMax(res.maxX, res.maxY);
      });
    } else if (node.type === 'Alternation') {
      const childY = y + V_SPACING;
      const leftX = x - H_SPACING / 2;
      const rightX = x + H_SPACING / 2;
      addLine(leftX, childY);
      addLine(rightX, childY);
      const resLeft = renderNode(node.left, leftX, childY, index + 1, depth + 1, lines, nodes);
      const resRight = renderNode(node.right, rightX, childY, resLeft.index + 1, depth + 1, lines, nodes);
      index = resRight.index;
      updateMax(resLeft.maxX, resLeft.maxY);
      updateMax(resRight.maxX, resRight.maxY);
    } else if (node.type === 'Repetition') {
      const childY = y + V_SPACING;
      addLine(x, childY);
      const res = renderNode(node.child, x, childY, index + 1, depth + 1, lines, nodes);
      index = res.index;
      updateMax(res.maxX, res.maxY);
    }
  }

  return { index, maxX, maxY };
};


const ASTTreeDiagram = ({ ast }: { ast: ASTNode }) => {
  const scale = useSharedValue(0.6);
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
      { scale: scale.value },
      { translateX: translationX.value },
      { translateY: translationY.value },
    ],
  }));

  const nodes: React.ReactElement[] = [];
  const lines: React.ReactElement[] = [];

  const { maxX, maxY } = renderNode(ast, 400, 100, 0, 0, lines, nodes);
const svgWidth = Math.min(Math.max(maxX + 100, 600), 1000); // entre 600 y 1000px

  const svgHeight = Math.max(600, maxY + 100);

  return (
    <View style={styles.fixedContainer}>
      <GestureDetector gesture={Gesture.Simultaneous(pinchGesture, panGesture)}>
        <Animated.View style={[animatedStyle]}>
          <Svg width={svgWidth} height={svgHeight}>
            {lines}
            {nodes}
          </Svg>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  fixedContainer: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 10,
    maxHeight: 450,
  },
});

export default ASTTreeDiagram; 