import { OptimalImageAd } from "./optimal-image-ad";

export default {
  title: "Image Ad",
  component: OptimalImageAd,
};

export const Default = {
  args: {
    publisher: "templewallet",
    adType: "tw-fullview",
    viewerData: {
      wallets: ["1:0x31AC3823d91A7B66CE0F4087d9a1D4A76300fA72"],
    },
  },
};
