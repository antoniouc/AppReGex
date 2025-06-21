import React from 'react';
import { SafeAreaView } from 'react-native';
import RegexTesterForm from '../organismos/RegexViewTester';

const RegexTesterView = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RegexTesterForm />
    </SafeAreaView>
  );
};

export default RegexTesterView;