// src/shared/atoms/AppText.tsx
import { Text, TextProps } from 'react-native';
import React from 'react';

const AppText = (props: TextProps) => {
  return <Text style={[{ fontSize: 16 }, props.style]} {...props} />;
};

export default AppText;
