import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import RegexHistoryList from '../organismos/RegexHistoryList';
import { useAppTheme } from '../../../../../core/useAppTheme';

const HistorialScreen = () => {
  const theme = useAppTheme();
  return (
    <SafeAreaView style={{...styles.container, backgroundColor: theme.background}}>
      <Text style={{...styles.title, color: theme.text}}>🕘 Historial de Regex</Text>
      <RegexHistoryList />
    </SafeAreaView>
  );
};

export default HistorialScreen;

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
