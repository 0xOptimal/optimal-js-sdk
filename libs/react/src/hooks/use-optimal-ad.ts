import { createOptimalAdHook } from "@getoptimal/react-helpers";

import { optimalQueryContext, useOptimal } from "./use-optimal";

export const useOptimalAd = createOptimalAdHook(
  useOptimal,
  optimalQueryContext,
);
