import { useCallback, useEffect, useMemo, useRef } from "react";
import { URLSearchParams as PolyURLSearchParams } from "react-native-url-polyfill";

import { useOptimalAd } from "../../hooks";
import { type OptimalAdProps } from "../../types/optimal-ad-props";
import VisibilitySensor from "../visibility-sensor";

const TypedURLSearchParams: typeof URLSearchParams =
  PolyURLSearchParams as never;

const log = (...args: unknown[]) => {
  if (__DEV__) {
    console.log(...args);
  }
};

export const OptimalCustomAd = ({
  opts,
  containerStyle,
  renderAd,
  renderLoading,
}: OptimalAdProps) => {
  const { data: decision, error, isLoading } = useOptimalAd(opts);

  const viewUrlRef = useRef(decision?.view_url);
  const viewTimeUrlRef = useRef(decision?.view_time_url);

  const viewTracked = useRef(false);
  const viewTimeTracked = useRef(false);

  useEffect(() => {
    if (viewUrlRef.current !== decision?.view_url) {
      viewTracked.current = false;
    }

    if (viewTimeUrlRef.current !== decision?.view_time_url) {
      viewTimeTracked.current = false;
    }

    viewUrlRef.current = decision?.view_url;
    viewTimeUrlRef.current = decision?.view_time_url;
  }, [decision?.view_time_url, decision?.view_url]);

  const ad = useMemo(() => {
    if (!decision) {
      return <></>;
    }
    return renderAd(decision);
  }, [decision, renderAd]);

  const loading = useMemo(() => {
    if (renderLoading) {
      return renderLoading();
    }
    return <></>;
  }, [renderLoading]);

  const handleVisible = useCallback(async () => {
    if (viewTracked.current) {
      log("view already tracked");
      return;
    }

    const url = decision?.view_url;
    if (url) {
      const response = await fetch(url);
      if (!response.ok) {
        console.warn(`Failed to load ad view: ${url}`);
      } else {
        log("view tracked", url);
        viewTracked.current = true;
      }
    }
  }, [decision?.view_url]);

  const handleHidden = useCallback(
    async (visibleDurationInMillis: number | null) => {
      if (viewTimeTracked.current) {
        log("view time already tracked");
        return;
      }

      const url = decision?.view_time_url;

      if (url && visibleDurationInMillis) {
        const params = new TypedURLSearchParams({
          view_time: Math.ceil(visibleDurationInMillis / 1000).toString(),
        });
        const trackUrl = `${url}?${params}`;
        const response = await fetch(trackUrl);
        if (!response.ok) {
          console.warn(`Failed to load ad view: ${trackUrl}`);
        } else {
          log("view time tracked", trackUrl);
          viewTimeTracked.current = true;
        }
      }
    },
    [decision?.view_time_url],
  );

  if (isLoading) {
    return <>{loading}</>;
  }

  if (error || !decision) {
    return <></>;
  }

  return (
    <VisibilitySensor
      style={containerStyle}
      onVisible={handleVisible}
      onHidden={handleHidden}
    >
      {ad}
    </VisibilitySensor>
  );
};
