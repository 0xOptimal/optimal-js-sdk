import { Image, StyleSheet } from "react-native";

import { OptimalAd, type sdk } from "@getoptimal/react-native";

export const OptimalImageAd = (opts: sdk.GetAdOpts) => {
  return (
    <OptimalAd
      opts={opts}
      containerStyle={styles.adContainer}
      renderAd={(decision) => (
        <Image
          source={{ uri: decision.image }}
          resizeMode="contain"
          style={styles.image}
        />
      )}
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
