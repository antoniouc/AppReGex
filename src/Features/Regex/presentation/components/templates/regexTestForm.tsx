// src/Features/Regex/presentation/components/templates/regexTestForm.tsx
import React from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import RegexTesterForm from '../organismos/RegexViewTester';
import ASTTreeDiagram from '../organismos/ASTTreeDiagram';
import { ASTDiagramviewModel } from '../../ViewModel/ASTDiagramViewModel';

export const RegexTesterScreen = () => {
  const ast = ASTDiagramviewModel();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <RegexTesterForm />

        {/* Separador visual opcional */}
        {ast && (
          <View style={styles.diagramContainer}>
            <ASTTreeDiagram ast={ast} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 50,
  },
  diagramContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
});
