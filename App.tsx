import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { initializeDB } from './src/services/database/SchemaSqlite';
import { NavigationContainer } from '@react-navigation/native';
import RegexStackNavigator from './src/Features/Regex/navigation/StackNavigator'; // <-- asegúrate que esta ruta sea correcta
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function App() {
  useEffect(() => {
    const initDatabase = async () => {
      try {
        await initializeDB();
        console.log("Base de datos inicializada correctamente");
      } catch (error) {
        console.error("Error al inicializar la base de datos", error);
      }
    };

    initDatabase();
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <NavigationContainer>
        <RegexStackNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}


