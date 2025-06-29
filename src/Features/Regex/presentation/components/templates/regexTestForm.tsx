// src/Features/Regex/presentation/components/templates/regexTestForm.tsx
import React from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet, Dimensions } from 'react-native';
import RegexTesterForm from '../organismos/RegexViewTester';
import ASTTreeDiagram from '../organismos/ASTTreeDiagram';
import { ASTDiagramviewModel } from '../../ViewModel/ASTDiagramViewModel';


export const RegexTesterScreen = () => {
  const ast = ASTDiagramviewModel();
  const { height: screenHeight } = Dimensions.get("window");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 30,
        }}
      >
        <RegexTesterForm />
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
    height: 400,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: '100%',
    backgroundColor: '#fff',

  },
});
