# Optimal JS SDK

## Quick Start

### Installation

Install the package with your package manager of choice.

```bash
# npm
npm install @optimal-js/sdk

# yarn
yarn add @optimal-js/sdk

# pnpm
pnpm add @optimal-js/sdk
```

### Usage

See the following example for a quick start. `GetAdOpts` can be obtained from the Optimal team.

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

### Setup dependencies

```diff
# Install dependencies
pnpm i
```

## Development

### Use iOS Simulator

1. Make sure you have XCode and XCommand Line Tools installed [as shown on expo docs](https://docs.expo.dev/workflow/ios-simulator/).

   > **NOTE:** If you just installed XCode, or if you have updated it, you need to open the simulator manually once. Run `npx expo start` in the root dir, and then enter `I` to launch Expo Go. After the manual launch, you can run `pnpm dev` in the root directory.

2. Run `pnpm dev` at the project root folder.

### For Android

1. Install Android Studio tools [as shown on expo docs](https://docs.expo.dev/workflow/android-studio-emulator/).
2. Run `pnpm dev` at the project root folder.

### Create a release

```bash
   # build the project
   pnpm exec turbo run build lint type-check

   # create a change set
   pnpm exec changeset

   # bump the version
   pnpm exec changeset version

   # build the project again so that version numbers are updated in the code
   pnpm exec turbo run build

   # add changes to git
   git add . -A

   # commit the changes
   git commit -m "your commit message"

   # push the changes
   git push

   # publish the packages
   pnpm publish -r

```
