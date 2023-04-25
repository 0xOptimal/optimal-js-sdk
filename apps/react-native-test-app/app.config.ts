import type { ExpoConfig } from "@expo/config";

const defineConfig = (): ExpoConfig => ({
  name: "Optimal",
  slug: "xyz.getoptimal",
  scheme: "optimal",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/icon.png",
    resizeMode: "contain",
    backgroundColor: "#9944ED",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "xyz.getoptimal",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#9944ED",
    },
  },
  extra: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    storybookEnabled: process.env.STORYBOOK_ENABLED === "true",
    eas: {
      // projectId: "your-project-id",
    },
  },
  plugins: ["./expo-plugins/with-modify-gradle.js"],
});

export default defineConfig;
