// src/shared/organisms/RegexTesterForm.tsx
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { ScrollView, StyleSheet } from 'react-native';
import RegexInputField from '../molecules/RegexTesterView';
import MatchList from '../molecules/MatchListregex';
import { RegexTextTesterViewModel } from '../../ViewModel/TestMatchRegex';
import { useRegexStore } from '../../../../../Store/useRegexStore';
import { HistoryButtonNavigation } from '../molecules/HistoryButtonNavigation';


const RegexTesterForm = () => {

  const{ pattern, setPattern, testText, setTestText } = useRegexStore();
  const matches = RegexTextTesterViewModel(pattern, testText) || [];

  /*
  const handleTest = (text: string) => {
    setTestText(text);
    try {
      const regex = new RegExp(pattern, 'g');
      const found = text.match(regex);
      setMatches(found || []);
    } catch (error) {
      setMatches([]);
    }
  };
*/
/*

   useEffect(() => {
    try {
      const regex = new RegExp(pattern, 'g');
      const found = testText.match(regex);
      setMatches(found || []);
    } catch (error) {
      setMatches([]);
    }
  }, [pattern, testText]);
  
  */

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ flex: 1 }}>
      <RegexInputField
        label="Expresión Regular"
        value={pattern}
        onChangeText={setPattern}
        placeholder="Ej: \\d+"
      />
      <RegexInputField
        label="Texto de Prueba"
        value={testText}
        onChangeText={setTestText}
        placeholder="Escribe algo para probar..."
        multiline ={true}
      />
     
      <MatchList matches={matches} originalText={testText} />
       <HistoryButtonNavigation />
      </View>

    </ScrollView>
    
  );
};

export default RegexTesterForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    
  },

  match: {
    backgroundColor: '#c2f0c2',
    padding: 5,
    borderRadius: 5,
    marginTop: 4,
  },
  noMatch: {
    fontStyle: 'italic',
    color: 'gray',
    marginTop: 4,
  },
});
