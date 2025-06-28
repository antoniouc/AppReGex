import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import RegexHistoryList from '../organismos/RegexHistoryList';

const HistorialScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🕘 Historial de Regex</Text>
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
