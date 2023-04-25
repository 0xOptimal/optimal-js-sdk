import React from "react";
import { StyleSheet, View } from "react-native";
import { OptimalAd } from "@getoptimal/react-native";

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
      <OptimalAd />
    </View>
  );
};
