import { useQuery } from "@tanstack/react-query";

import { type GetAdOpts } from "@getoptimal/js-sdk";

import { optimalQueryContext, useOptimal } from "./use-optimal";

const TWO_SECONDS = 2 * 1000;

export const useOptimalAd = (opts: GetAdOpts) => {
  const optimal = useOptimal();

  return useQuery([opts], () => optimal.getAd(opts), {
    context: optimalQueryContext,
    staleTime: TWO_SECONDS,
    cacheTime: 0,
  });
};
