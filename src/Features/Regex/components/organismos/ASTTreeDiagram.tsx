// src/shared/organisms/ASTTreeDiagram.tsx
import React from 'react';
import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native';
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';

type ASTNode =
    | { type: 'Char'; value: string }
    | { type: 'Concat'; children: ASTNode[] }
    | { type: 'Alternation'; left: ASTNode; right: ASTNode }
    | { type: 'Repetition'; quantifier: string; child: ASTNode }
    | { type: 'CharacterClass'; value: string };
    
// type NodeRender = {
//     node: ASTNode;
//     x: number;
//     y: number;
//     depth: number;
// };

const NODE_RADIUS = 20;
const H_SPACING = 100;
const V_SPACING = 80;

const renderNode = (
    node: ASTNode,
    x: number,
    y: number,
    index: number,
    depth: number,
    lines: React.ReactElement[],
    nodes: React.ReactElement[]
): number => {
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
                        : (node as ASTNode).type;;

    nodes.push(
        <Circle key={`circle-${index}`} cx={x} cy={y} r={NODE_RADIUS} fill="#add8e6" />,
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

    let currentX = x - (node.type === 'Concat' && node.children.length > 1 ? ((node.children.length - 1) * H_SPACING) / 2 : H_SPACING);

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
    };

    if (node.type === 'Concat') {
        node.children.forEach((child, i) => {
            const childX = currentX + i * H_SPACING;
            const childY = y + V_SPACING;
            addLine(childX, childY);
            index = renderNode(child, childX, childY, index + 1, depth + 1, lines, nodes);
        });
    }

    if (node.type === 'Alternation') {
        const childY = y + V_SPACING;
        const leftX = x - H_SPACING / 2;
        const rightX = x + H_SPACING / 2;
        addLine(leftX, childY);
        addLine(rightX, childY);
        index = renderNode(node.left, leftX, childY, index + 1, depth + 1, lines, nodes);
        index = renderNode(node.right, rightX, childY, index + 10, depth + 1, lines, nodes);
    }

    if (node.type === 'Repetition') {
        const childY = y + V_SPACING;
        addLine(x, childY);
        index = renderNode(node.child, x, childY, index + 1, depth + 1, lines, nodes);
    }

    return index;
};

const ASTTreeDiagram = ({ ast }: { ast: ASTNode }) => {
    const nodes: React.ReactElement[] = [];
    const lines: React.ReactElement[] = [];



    renderNode(ast, 300, 100, 0, 0, lines, nodes);

    return (
        <ScrollView horizontal={true}  contentContainerStyle={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{width: 1200, height: 500}}>
                    <Svg width={800} height={500}>
                        {lines}
                        {nodes}
                    </Svg>
                </View>
            </ScrollView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexGrow: 1,
    flexDirection: 'row',
    width: 1200,
  },});

export default ASTTreeDiagram;
