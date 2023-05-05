import { Text } from "react-native";

import { OptimalAd } from "@getoptimal/react-native";

export default {
  title: "Image Ad",
  component: OptimalAd,
};

export const Default = {
  args: {
    opts: {
      publisher: "templewallet",
      adType: "tw-fullview",
      viewerData: {
        wallets: ["1:0x31AC3823d91A7B66CE0F4087d9a1D4A76300fA72"],
      },
    },
    renderLoading: () => <Text>Loading...</Text>,
  },
};
