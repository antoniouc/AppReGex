import React from 'react';
import { View, ScrollView, StyleSheet, Text, Button } from 'react-native';
import RegexInputField from '../molecules/RegexTesterView';
import MatchList from '../molecules/MatchListregex';
import { RegexTextTesterViewModel } from '../../ViewModel/TestMatchRegex';
import { useRegexStore } from '../../../../../Store/useRegexStore';
import { HistoryButtonNavigation } from '../molecules/HistoryButtonNavigation';
import { DiagramButtonNavigation } from '../molecules/RailDiagrambutton';
import { useAppTheme } from '../../../../../core/useAppTheme';
import { ToggleTheme } from '../molecules/ToogleTheme';

const RegexTesterForm = () => {
  const { pattern, setPattern, testText, setTestText } = useRegexStore();
  const matches = RegexTextTesterViewModel(pattern, testText) || [];
  const theme = useAppTheme();

  const cargarEjemplo = () => {
    setPattern('\\b\\d{1,2}/\\d{1,2}/\\d{4}\\b');
    setTestText('Hoy es 30/06/2025 y mañana será 01/07/2025.');
  };

  const limpiarCampos = () => {
    setPattern('');
    setTestText('');
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
      <ToggleTheme />
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
          multiline={true}
        />

        {/* 🔘 Botón para cargar ejemplo */}
        <View style={styles.button}>
          <Button title="Cargar ejemplo" onPress={cargarEjemplo} />
        </View>

        {/* 🔴 Botón para limpiar campos */}
        <View style={styles.button}>
          <Button title="Limpiar campos" color="#d9534f" onPress={limpiarCampos} />
        </View>

        <MatchList matches={matches} originalText={testText} />

        <View style={styles.buttonRow}>
          <DiagramButtonNavigation />
          <HistoryButtonNavigation />
        </View>
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 20,
  },
  button: {
    marginTop: 10,
    alignSelf: 'center',
    width: '60%',
  },
});
