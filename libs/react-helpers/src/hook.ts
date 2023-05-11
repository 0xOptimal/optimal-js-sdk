import { useCallback, useMemo, useRef } from "react";
import { useQuery, type QueryClient } from "@tanstack/react-query";

import { type GetAdOpts, type OptimalClient } from "@getoptimal/js-sdk";

declare global {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const __DEV__: boolean | undefined;
}

const TWO_SECONDS = 2 * 1000;

const log = (...args: unknown[]) => {
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "dev" ||
    __DEV__
  ) {
    console.log(...args);
  }
};

export const createOptimalAdHook = (
  useOptimal: () => OptimalClient,
  context: React.Context<QueryClient | undefined>,
) => {
  const useOptimalAd = (opts: GetAdOpts) => {
    const optimal = useOptimal();

    const {
      data: decision,
      error,
      isLoading,
    } = useQuery([opts], () => optimal.getAd(opts), {
      context,
      staleTime: TWO_SECONDS,
      cacheTime: 0,
    });

    const viewTracked = useRef(false);

    const trackView = useCallback(async () => {
      if (viewTracked.current) {
        log("view already tracked");
        return;
      }

      if (decision) {
        try {
          log("tracking view");
          await optimal.trackView(decision);
          viewTracked.current = true;
        } catch {
          log("failed to track view");
        }
      }
    }, [decision, optimal]);

    const viewTimeTracked = useRef(false);

    const trackViewTime = useCallback(
      async (visibleDurationInMillis: number | null) => {
        if (viewTimeTracked.current) {
          log("view time already tracked");
          return;
        }

        if (decision && visibleDurationInMillis) {
          try {
            log("tracking view time:", visibleDurationInMillis);
            await optimal.trackViewTime(decision, visibleDurationInMillis);
            viewTimeTracked.current = true;
          } catch {
            log("failed to track view time");
          }
        }
      },
      [decision, optimal],
    );

    return useMemo(
      () => ({
        decision,
        error,
        isLoading,
        trackView,
        trackViewTime,
      }),
      [decision, error, isLoading, trackView, trackViewTime],
    );
  };

  return useOptimalAd;
};
