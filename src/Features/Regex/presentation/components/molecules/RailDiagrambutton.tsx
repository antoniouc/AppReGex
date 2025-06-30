import { MyButton } from "../atoms/MyButton";
import MyIcon from "../atoms/MyIcon";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../../navigation/NavigationTypes";

export const DiagramButtonNavigation = () => {

    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();


  const handlePress = () => {
    navigation.navigate("RegexDiagram");
  };

  return (
    <View style={styles.container}>
      <MyButton
        onPress={handlePress}
        icon={<MyIcon name="git-branch" size={24} color="white" />}
        title="Diagrama "
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