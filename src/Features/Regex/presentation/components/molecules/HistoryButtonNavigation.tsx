import { MyButton } from "../atoms/MyButton";
import MyIcon from "../atoms/MyIcon";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../../navigation/NavigationTypes";

export const HistoryButtonNavigation = () => {

    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();


  const handlePress = () => {
    navigation.navigate("RegexHistory");
  };

  return (
    <View style={styles.container}>
      <MyButton
        onPress={handlePress}
        icon={<MyIcon name="time-outline" size={24} color="white" />}
        title="Historial"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
});