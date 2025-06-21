// src/shared/atoms/AppInput.tsx
import { TextInput, TextInputProps, StyleSheet } from 'react-native';
import React from 'react';

const AppInput = (props: TextInputProps) => {
  return <TextInput style={[styles.input, props.style]} {...props} />;
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
});

export default AppInput;
