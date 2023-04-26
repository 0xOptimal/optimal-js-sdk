import { useQuery } from "@tanstack/react-query";

import { type GetAdOpts } from "@getoptimal/js-sdk";

import { optimalQueryContext, useOptimal } from "./use-optimal";

export const useOptimalAd = (opts: GetAdOpts) => {
  const optimal = useOptimal();

  return useQuery([opts], () => optimal.getAd(opts), {
    context: optimalQueryContext,
  });
};
