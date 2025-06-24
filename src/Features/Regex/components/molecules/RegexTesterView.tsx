// src/shared/molecules/RegexInputField.tsx
import React from 'react';
import AppText from '../atoms/MyText';
import AppInput from '../atoms/MyInput';
import { StyleSheet, View } from 'react-native';

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
};

const RegexInputField = ({ label, value, onChangeText, placeholder, multiline }: Props) => {
  return (
    <View>
      <AppText style={styles.text} >{label}</AppText>
      <AppInput
     style={styles.input}
      
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline={multiline}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
   
    width: '100%',
    minWidth: '90%',
  },
  text:{
    fontWeight: 'bold',
     marginTop: 20,
     height: 20,
    width: '100%',
    minWidth: '90%',
  }
})

export default RegexInputField;
