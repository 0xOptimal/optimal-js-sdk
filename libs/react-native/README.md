# Optimal React Native SDK

## Quick Start

### Installation

Install the package with your package manager of choice:

```bash
# npm
npm install @getoptimal/react-native

# yarn
yarn add @getoptimal/react-native

# pnpm
pnpm add @getoptimal/react-native
```

### Usage

See the following example for a quick start. `GetAdOpts` can be obtained from the Optimal team.
Typescript typings are included in the package.

```tsx
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
```

### More Examples

See the example app [stories](./../../apps/react-native-test-app/src/components/) for more examples.
