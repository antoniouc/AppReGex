import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Rect, Line, Text as SvgText, Polygon } from 'react-native-svg';
import {
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

type ASTNode =
  | { type: 'Char'; value: string }
  | { type: 'Concat'; children: ASTNode[] }
  | { type: 'Alternation'; left: ASTNode; right: ASTNode }
  | { type: 'Repetition'; quantifier: string; child: ASTNode }
  | { type: 'CharacterClass'; value: string };

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

const drawCurve = (
  elements: React.ReactElement[],
  startX: number,
  startY: number,
  midX: number,
  midY: number,
  endX: number,
  endY: number,
  key: string
) => {
  elements.push(
    <Line
      key={`${key}-v1`}
      x1={startX}
      y1={startY}
      x2={startX}
      y2={midY}
      stroke="#000"
      strokeWidth={2}
    />
  );
  elements.push(
    <Line
      key={`${key}-h`}
      x1={startX}
      y1={midY}
      x2={endX}
      y2={midY}
      stroke="#000"
      strokeWidth={2}
    />
  );
  elements.push(
    <Line
      key={`${key}-v2`}
      x1={endX}
      y1={midY}
      x2={endX}
      y2={endY}
      stroke="#000"
      strokeWidth={2}
    />
  );
};

const renderNode = (
  node: ASTNode,
  x: number,
  y: number,
  elements: React.ReactElement[]
): { x: number; y: number } => {
  const nodeKey = `${node.type}-${x}-${y}`;

  const label =
    node.type === 'Char'
      ? node.value
      : node.type === 'CharacterClass'
      ? `[${node.value}]`
      : node.type === 'Repetition'
      ? node.quantifier
      : node.type === 'Alternation'
      ? '|'
      : '·';

  drawBox(elements, label, x, y, nodeKey);

  const leftX = x;
  const rightX = x + BOX_WIDTH;
  const centerY = y + BOX_HEIGHT / 2;

  if (node.type === 'Char' || node.type === 'CharacterClass') {
    drawLine(elements, leftX - H_SPACING / 2, centerY, leftX, centerY, `in-${nodeKey}`);
    drawLine(elements, rightX, centerY, rightX + H_SPACING / 2, centerY, `out-${nodeKey}`);
    return { x: rightX + H_SPACING, y };
  }

  if (node.type === 'Concat') {
    drawLine(elements, leftX - H_SPACING / 2, centerY, leftX, centerY, `in-${nodeKey}`);

    let currX = x;
    node.children.forEach((child) => {
      const res = renderNode(child, currX, y, elements);
      currX = res.x;
    });

    drawLine(elements, currX - H_SPACING / 2, centerY, currX, centerY, `out-${nodeKey}`);

    return { x: currX + H_SPACING / 2, y };
  }

  if (node.type === 'Alternation') {
    const topY = y - V_SPACING;
    const bottomY = y + V_SPACING;
    const startX = rightX;
    const branchX = startX + H_SPACING / 2;
    const endX = branchX + H_SPACING;

    drawLine(elements, startX, centerY, branchX, centerY, `alt-main-${nodeKey}`, false);

    drawCurve(elements, branchX, centerY, branchX, topY + BOX_HEIGHT / 2, endX, topY + BOX_HEIGHT / 2, `alt-top-${nodeKey}`);
    drawCurve(elements, branchX, centerY, branchX, bottomY + BOX_HEIGHT / 2, endX, bottomY + BOX_HEIGHT / 2, `alt-bot-${nodeKey}`);

    const leftRes = renderNode(node.left, endX, topY, elements);
    const rightRes = renderNode(node.right, endX, bottomY, elements);

    const mergeX = Math.max(leftRes.x, rightRes.x);
    drawLine(elements, leftRes.x, topY + BOX_HEIGHT / 2, mergeX, topY + BOX_HEIGHT / 2, `merge-top-${nodeKey}`, false);
    drawLine(elements, rightRes.x, bottomY + BOX_HEIGHT / 2, mergeX, bottomY + BOX_HEIGHT / 2, `merge-bot-${nodeKey}`, false);

    drawLine(elements, mergeX, topY + BOX_HEIGHT / 2, mergeX, bottomY + BOX_HEIGHT / 2, `merge-vert-${nodeKey}`, false);

    drawLine(elements, mergeX, centerY, mergeX + H_SPACING / 2, centerY, `alt-out-${nodeKey}`);

    return { x: mergeX + H_SPACING, y };
  }

  if (node.type === 'Repetition') {
    drawLine(elements, leftX - H_SPACING / 2, centerY, leftX, centerY, `in-${nodeKey}`);

    const childX = rightX + H_SPACING;
    drawLine(elements, rightX, centerY, childX, centerY, `to-child-${nodeKey}`);

    const childRes = renderNode(node.child, childX, y, elements);

    drawLine(elements, childRes.x, centerY, childRes.x + H_SPACING / 2, centerY, `out-child-${nodeKey}`);

    const loopTopY = y - V_SPACING;
    const loopLeftX = leftX - H_SPACING / 2;
    const loopRightX = childRes.x + H_SPACING / 2;

    drawLine(elements, loopLeftX, centerY, loopLeftX, loopTopY, `loop-up-${nodeKey}`, false);
    drawLine(elements, loopLeftX, loopTopY, loopRightX, loopTopY, `loop-top-${nodeKey}`, false);
    drawLine(elements, loopRightX, loopTopY, loopRightX, centerY, `loop-down-${nodeKey}`, false);

    drawArrow(elements, loopRightX, loopTopY, loopRightX - 10, loopTopY, `arrow-loop-top-${nodeKey}`);
    drawArrow(elements, loopLeftX, loopTopY, loopLeftX, loopTopY + 10, `arrow-loop-left-${nodeKey}`);
    drawArrow(elements, loopRightX, centerY, loopRightX - 10, centerY, `arrow-loop-down-${nodeKey}`);
    drawArrow(elements, loopLeftX, centerY, loopLeftX, centerY - 10, `arrow-loop-up-${nodeKey}`);

    return { x: childRes.x + H_SPACING, y };
  }

  return { x: x + BOX_WIDTH + H_SPACING, y };
};

const RailroadDiagram = ({ ast }: { ast: ASTNode }) => {
  const elements: React.ReactElement[] = [];
  const startX = 50;
  const startY = 150;

  const { x: maxX } = renderNode(ast, startX, startY, elements);

  const svgWidth = Math.max(maxX + 100, 1000);
  const svgHeight = 400;

  // Reanimated shared values
  const scale = useSharedValue(1);
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const savedTranslationX = useSharedValue(0);
  const savedTranslationY = useSharedValue(0);

  // Gestos
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
        <AnimatedSvg
          width={svgWidth}
          height={svgHeight}
          style={animatedStyle}
        >
          {elements}
        </AnimatedSvg>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
});

export default RailroadDiagram;
