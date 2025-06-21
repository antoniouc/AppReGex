// src/shared/molecules/RegexInputField.tsx
import React from 'react';
import AppText from '../atoms/MyText';
import AppInput from '../atoms/MyInput';

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
};

const RegexInputField = ({ label, value, onChangeText, placeholder, multiline }: Props) => {
  return (
    <>
      <AppText style={{ fontWeight: 'bold', marginTop: 20 }}>{label}</AppText>
      <AppInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline={multiline}
      />
    </>
  );
};

export default RegexInputField;
