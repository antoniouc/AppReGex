import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import  RailroadDiagram  from '../organismos/RailRoadDiagram';
import {ASTDiagramviewModel  } from '../../ViewModel/ASTDiagramViewModel';

const RegexRailScreen = ( ) => {
    const ast = ASTDiagramviewModel();
  return (
    <SafeAreaView style={styles.container}>
     {ast && <RailroadDiagram ast={ast} />}
    </SafeAreaView>
  );
};

export default RegexRailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});
