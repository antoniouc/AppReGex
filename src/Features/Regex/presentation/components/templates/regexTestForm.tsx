import React, { useLayoutEffect } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet, TouchableOpacity} from 'react-native';
import RegexTesterForm from '../organismos/RegexViewTester';
import ASTTreeDiagram from '../organismos/ASTTreeDiagram';
import { ASTDiagramviewModel } from '../../ViewModel/ASTDiagramViewModel';



export const RegexTesterScreen = () => {
  const ast = ASTDiagramviewModel();


  return (
    <SafeAreaView style={styles.safeArea}>


        <RegexTesterForm />
     

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
   // paddingBottom: 50,
  },
  diagramContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
});
