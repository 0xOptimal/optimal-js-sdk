# Optimal React SDK

## Quick Start

### Installation

Install the package with your package manager of choice:

```bash
# npm
npm install @getoptimal/react

# yarn
yarn add @getoptimal/react

# pnpm
pnpm add @getoptimal/react
```

Then simply include `OptimalProvider` in the root of your app:

```tsx
<OptimalProvider>
  <MyApp />
</OptimalProvider>
```

### Usage

See the following example for a quick start. `GetAdOpts` can be obtained from the Optimal team.

Following example will render the ad automatically, if you would like to have more control, check the next example.

#### Automatic

```jsx
import { OptimalAd } from "@getoptimal/react";

const opts = {
  publisher: "publisher",
  adType: "ad type",
  viewerData: {
    wallets: ["1:wallet"],
  },
};

export const MyComponent = () => {
  return (
    <OptimalAd
      renderLoading={() => {
        return <Text>i am loading</Text>;
      }}
      opts={opts}
    />
  );
};
```

#### Manual

You can also use the following example for custom ads:

```tsx
import { type OptimalPredefinedAdProps, OptimalCustomAd } from "@getoptimal/react";

export const MyAd = (props: OptimalPredefinedAdProps) => {
  return (
    <OptimalCustomAd
      {...props}
      renderAd={(decision) => {
        return <>your custom component</>
      }
    />
  );
};
```

### Typings

Typescript typings are included in the package.

### More Examples

See the example app [stories](https://github.com/0xOptimal/optimal-js-sdk/tree/main/apps/react-test-app/src/components) for more examples.
