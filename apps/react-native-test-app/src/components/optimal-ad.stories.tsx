import { Text } from "react-native";

import { OptimalAd } from "@getoptimal/react-native";

export default {
  title: "Image Ad",
  component: OptimalAd,
};

export const Default = {
  args: {
    opts: {
      publisher: "test-publisher",
      adTypes: ["sq-img-text-box"],
      viewerData: {
        wallets: [
          "1:0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
          "1:0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
        ],
      },
    },
    renderLoading: () => <Text>Loading...</Text>,
  },
};
