import headlessPlugin from "@headlessui/tailwindcss";
import type { Config } from "tailwindcss";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import baseConfig from "@getoptimal/tailwind-config";

export default {
  content: ["./src/**/*.tsx"],
  presets: [baseConfig],
  plugins: [headlessPlugin],
} satisfies Config;
