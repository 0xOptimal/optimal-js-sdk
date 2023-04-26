import { Image, StyleSheet } from "react-native";

import { OptimalAd } from "@getoptimal/react-native";
import { type GetAdOpts } from "@getoptimal/react-native/sdk";

export const OptimalImageAd = (opts: GetAdOpts) => {
  return (
    <OptimalAd
      opts={opts}
      containerStyle={styles.adContainer}
      renderAd={(decision) => {
        return (
          <Image
            source={{ uri: decision.image }}
            resizeMode="contain"
            style={styles.image}
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  adContainer: {
    width: "100%",
    aspectRatio: 22 / 9,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
