import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface MyButtonProps {
  onPress: () => void;
  title: string;
  icon?: React.ReactNode; // Puedes pasar un ícono como <Ionicons ... />
  disabled?: boolean;
}

export const MyButton: React.FC<MyButtonProps> = ({
  onPress,
  title,
  icon,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
  disabledButton: {
    backgroundColor: '#A9A9A9',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8, // Espacio entre ícono y texto
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
export default MyButton;