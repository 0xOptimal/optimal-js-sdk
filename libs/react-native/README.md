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

Following example will render the ad automatically, if you would like to have more control, check the next example.

#### Automatic

```tsx
import { OptimalAd, type sdk } from "@getoptimal/react-native";

const opts: sdk.GetAdOpts = {
  publisher: "publisher",
  adType: "ad type",
  viewerData: {
    wallets: ["1:wallet"],
  },
};

export const MyComponent = ({ opts }: {}) => {
  return <OptimalAd opts={opts} />;
};
```

#### Manual

You can also use the following example for custom ads:

```tsx
import { Text } from 'react-native';
import { type OptimalPredefinedAdProps, OptimalCustomAd } from "@getoptimal/react-native";

export const MyAd = (props: OptimalPredefinedAdProps) => {
  return (
    <OptimalCustomAd
      {...props}
      renderAd={(decision) => {
        return <Text>your custom component</Text>
      }
    />
  );
};
```

### Typings

Typescript typings are included in the package.

### More Examples

See the example app [stories](https://github.com/0xOptimal/optimal-js-sdk/tree/main/apps/react-native-test-app/src/components) for more examples.
