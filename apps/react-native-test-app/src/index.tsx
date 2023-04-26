import React from "react";
import { StyleSheet, Text, View } from "react-native";

const style = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    paddingHorizontal: 20,
  },
});

export const Index = () => {
  return (
    <View style={style.container}>
      <Text>Use storybook to test optimal ads</Text>
    </View>
  );
};
