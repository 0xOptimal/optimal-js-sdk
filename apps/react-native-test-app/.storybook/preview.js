import { View } from "react-native";

import { OptimalProvider } from "@getoptimal/react-native";

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <OptimalProvider>
        <Story />
      </OptimalProvider>
    </View>
  ),
];
