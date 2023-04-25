import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { client } from "@getoptimal/js-sdk";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#9944ED",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  text: {
    color: "white",
    fontWeight: "700",
    fontSize: 36,
  },
});

export const OptimalFullPageAd = () => {
  const [adText, setAdText] = useState("");

  useEffect(() => {
    client
      .getAd({ text: "Optimal Full Page Ad" })
      .then((value) => setAdText(value))
      .catch(() => setAdText("error"));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{adText || "Loading..."}</Text>
    </View>
  );
};
