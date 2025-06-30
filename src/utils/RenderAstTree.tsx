// src/Features/Regex/utils/renderASTTree.ts
import React from 'react';
import { Circle, Line, Text as SvgText } from 'react-native-svg';

export type ASTNode =
  | { type: 'Char'; value: string }
  | { type: 'Concat'; children: ASTNode[] }
  | { type: 'Alternation'; left: ASTNode; right: ASTNode }
  | { type: 'Repetition'; quantifier: string; child: ASTNode }
  | { type: 'CharacterClass'; value: string };

const NODE_RADIUS = 20;
const H_SPACING = 100;
const V_SPACING = 80;

type RenderResult = {
  index: number;
  maxX: number;
  maxY: number;
};

export const renderASTTree = (
  node: ASTNode,
  x: number,
  y: number,
  index: number,
  depth: number,
  lines: React.ReactElement[],
  nodes: React.ReactElement[]
): RenderResult => {
  const nodeLabel =
    node.type === 'Char'
      ? node.value
      : node.type === 'Repetition'
        ? '*'
        : node.type === 'CharacterClass'
          ? node.value
          : node.type === 'Alternation'
            ? '|'
            : node.type === 'Concat'
              ? '·'
              : (node as ASTNode).type;

  nodes.push(<Circle key={`circle-${index}`} cx={x} cy={y} r={NODE_RADIUS} fill="#add8e6" />);
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

  if (node.type === 'Concat') {
    const baseX = x - ((node.children.length - 1) * H_SPACING) / 2;
    node.children.forEach((child, i) => {
      const childX = baseX + i * H_SPACING;
      const childY = y + V_SPACING;
      addLine(childX, childY);
      const res = renderASTTree(child, childX, childY, index + 1, depth + 1, lines, nodes);
      index = res.index;
      updateMax(res.maxX, res.maxY);
    });
  }

  if (node.type === 'Alternation') {
    const childY = y + V_SPACING;
    const leftX = x - H_SPACING / 2;
    const rightX = x + H_SPACING / 2;
    addLine(leftX, childY);
    addLine(rightX, childY);
    const resLeft = renderASTTree(node.left, leftX, childY, index + 1, depth + 1, lines, nodes);
    const resRight = renderASTTree(node.right, rightX, childY, resLeft.index + 1, depth + 1, lines, nodes);
    index = resRight.index;
    updateMax(resLeft.maxX, resLeft.maxY);
    updateMax(resRight.maxX, resRight.maxY);
  }

  if (node.type === 'Repetition') {
    const childY = y + V_SPACING;
    addLine(x, childY);
    const res = renderASTTree(node.child, x, childY, index + 1, depth + 1, lines, nodes);
    index = res.index;
    updateMax(res.maxX, res.maxY);
  }

  return { index, maxX, maxY };
};
