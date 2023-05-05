import { useCallback, useMemo } from "react";

import { useOptimalAd } from "../../hooks";
import { type OptimalAdProps } from "../../types/optimal-ad-props";
import VisibilitySensor from "../visibility-sensor";

export const OptimalCustomAd = ({
  opts,
  containerStyle,
  renderAd,
  renderLoading,
}: OptimalAdProps) => {
  const { data: decision, error, isLoading } = useOptimalAd(opts);

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
    const url = decision?.view_url;
    if (url) {
      const response = await fetch(url);
      if (!response.ok) {
        console.warn(`Failed to load ad view: ${url}`);
      }
    }
  }, [decision?.view_url]);

  const handleHidden = useCallback(
    async (visibleDurationInMillis: number | null) => {
      const url = decision?.view_time_url;

      if (url && visibleDurationInMillis) {
        const params = new URLSearchParams({
          view_time: Math.round(visibleDurationInMillis / 1000).toString(),
        });
        const response = await fetch(`${url}?${params}`);
        if (!response.ok) {
          console.warn(`Failed to load ad view: ${url}`);
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
