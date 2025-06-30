import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../../navigation/NavigationTypes";
import { MyButton } from "../atoms/MyButton";
import MyIcon from "../atoms/MyIcon";
import { useAppTheme } from "../../../../../core/useAppTheme";

export const HistoryButtonNavigation = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const theme = useAppTheme();

  const handlePress = () => {
    navigation.navigate("RegexHistory");
  };

  return (
    <View style={styles.button}>
      <MyButton
        onPress={handlePress}
        icon={<MyIcon name="time-outline" size={20} color="white" />}
        title="Historial"
        style={{ backgroundColor: theme.primary }}
        textStyle={{ color: 'white' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 4,
  },
});
