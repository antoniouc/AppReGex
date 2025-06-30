import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { useAppTheme } from '../../../../../core/useAppTheme';

interface MyButtonProps {
  onPress: () => void;
  title: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;      // ✅ Aquí
  textStyle?: StyleProp<TextStyle>;  // ✅ Aquí
}

export const MyButton: React.FC<MyButtonProps> = ({
  onPress,
  title,
  icon,
  disabled = false,
  style,
  textStyle,
}) => {
  const theme = useAppTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        styles.button,
        { backgroundColor: disabled ? theme.border : theme.primary },
        style, // ✅ Se aplica el estilo externo
      ]}
    >
      <View style={styles.content}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <Text style={[styles.buttonText, { color: theme.textContrast }, textStyle]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
