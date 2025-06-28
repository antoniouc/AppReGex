import React from 'react';
import { SafeAreaView } from 'react-native';
import RegexTesterForm from '../organismos/RegexViewTester';
import ASTTreeDiagram from '../organismos/ASTTreeDiagram';
import { ASTDiagramviewModel } from '../../ViewModel/ASTDiagramViewModel';

export const RegexTesterScreen = () => {
 
  const ast = ASTDiagramviewModel();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RegexTesterForm />
      {ast && <ASTTreeDiagram ast={ast} />}
    </SafeAreaView>
  );
};
