// src/shared/molecules/RegexInputField.tsx
import React from 'react';
import AppText from '../atoms/MyText';
import AppInput from '../atoms/MyInput';
import { StyleSheet, View } from 'react-native';
import { useAppTheme } from '../../../../../core/useAppTheme';

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
};

const RegexInputField = ({ label, value, onChangeText, placeholder, multiline }: Props) => {
  const theme = useAppTheme();

  return (
    <View style={{ marginBottom: 16 }}>
      <AppText style={[styles.text, { color: theme.text }]}>{label}</AppText>
      <AppInput
        style={[
          styles.input,
          {
            borderColor: theme.border,
            backgroundColor: theme.inputBackground,
            color: theme.text,
          },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.text + '88'}
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
  },
  text: {
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default RegexInputField;
