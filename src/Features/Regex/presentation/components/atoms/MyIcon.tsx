//  creamos el icon personalizado que se usará en la aplicacion 

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type MyIconProps = {
  name: keyof typeof Ionicons.glyphMap; 
  size?: number;
  color?: string;
};
const MyIcon: React.FC<MyIconProps> = ({ name, size = 24, color = 'black' }) => {
  return (
    <View style={styles.iconContainer}>
      <Ionicons name={name} size={size} color={color} />
    </View>
  );
};
const styles = StyleSheet.create({
  iconContainer: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'transparent', // Cambia el color de fondo si es necesario
  },
});
export default MyIcon;
