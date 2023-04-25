import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { client } from "@getoptimal/js-sdk";

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "#9944ED",
    borderStyle: "solid",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
});

export const OptimalAd = () => {
  const [adText, setAdText] = useState("");

  useEffect(() => {
    client
      .getAd({ text: "Optimal Ad" })
      .then((value) => setAdText(value))
      .catch(() => setAdText("error"));
  }, []);

  return (
    <View style={styles.container}>
      <Text>{adText || "Loading..."}</Text>
    </View>
  );
};
