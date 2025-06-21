// src/shared/organisms/RegexTesterForm.tsx
import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import RegexInputField from '../molecules/RegexTesterView';
import AppText from '../atoms/MyText';

const RegexTesterForm = () => {
  const [pattern, setPattern] = useState('');
  const [testText, setTestText] = useState('');
  const [matches, setMatches] = useState<string[]>([]);

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <RegexInputField
        label="Expresión Regular"
        value={pattern}
        onChangeText={setPattern}
        placeholder="Ej: \\d+"
      />
      <RegexInputField
        label="Texto de Prueba"
        value={testText}
        onChangeText={handleTest}
        placeholder="Escribe algo para probar..."
        multiline
      />
      <AppText style={{ fontWeight: 'bold', marginTop: 20 }}>Coincidencias:</AppText>
      {matches.length > 0 ? (
        matches.map((match, i) => (
          <AppText key={i} style={styles.match}>{match}</AppText>
        ))
      ) : (
        <AppText style={styles.noMatch}>Sin coincidencias</AppText>
      )}
    </ScrollView>
  );
};

export default RegexTesterForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
