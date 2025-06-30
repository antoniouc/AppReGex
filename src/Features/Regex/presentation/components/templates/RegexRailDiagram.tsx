import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from 'react-native';
import RailroadDiagram from '../organismos/RailRoadDiagram';
import ASTTreeDiagram from '../organismos/ASTTreeDiagram';
import { ASTDiagramviewModel } from '../../ViewModel/ASTDiagramViewModel';

const RegexRailScreen = () => {
  const ast = ASTDiagramviewModel();

  if (!ast) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>

                <View style={styles.diagramContainer}>
          <Text style={styles.title}>Diagrama AST</Text>
          <ASTTreeDiagram ast={ast} />
        </View>
        <View style={styles.separator} />
                <View style={styles.diagramContainer}>
          <Text style={styles.title}>Diagrama de Ferrocarril</Text>
          <RailroadDiagram ast={ast} />
        </View>


      </ScrollView>
    </SafeAreaView>
  );
};

export default RegexRailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  diagramContainer: {
    
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  separator: {
    height: 2,
    backgroundColor: '#ccc',
    marginVertical: 16,
    width: '90%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
});
