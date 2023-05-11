import { useCallback, useEffect, useMemo, useRef } from "react";

import { type OptimalAdProps } from "@getoptimal/react-helpers";

import { useOptimalAd } from "../../hooks";
import VisibilitySensor from "../visibility-sensor";

export const OptimalCustomAd = ({
  opts,
  containerStyle,
  renderAd,
  renderLoading,
}: OptimalAdProps) => {
  const { decision, error, isLoading, trackView, trackViewTime } =
    useOptimalAd(opts);

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
    await trackView();
  }, [trackView]);

  const handleHidden = useCallback(
    async (visibleDurationInMillis: number | null) => {
      await trackViewTime(visibleDurationInMillis);
    },
    [trackViewTime],
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
