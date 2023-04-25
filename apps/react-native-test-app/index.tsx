import { registerRootComponent } from "expo";
import Constants from "expo-constants";

import { Index } from "./src/index";

function App() {
  return <Index />;
}

export let AppEntryPoint = App;

if (Constants.expoConfig?.extra?.storybookEnabled) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-var-requires
  AppEntryPoint = require("./.storybook").default;
}

registerRootComponent(AppEntryPoint);
