// src/Features/Regex/presentation/components/organismos/ASTTreeDiagram.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg from 'react-native-svg';
import {
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { ASTNode, renderASTTree } from '../../../../../utils/RenderAstTree';

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

  const { maxX, maxY } = renderASTTree(ast, 400, 100, 0, 0, lines, nodes);
  const svgWidth = Math.min(Math.max(maxX + 100, 600), 1000);
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
