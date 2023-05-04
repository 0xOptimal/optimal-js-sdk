import { useCallback, useMemo, type ReactNode } from "react";
import { Text, type ViewProps } from "react-native";

import { type Decision, type GetAdOpts } from "@getoptimal/js-sdk";

import { useOptimalAd } from "../hooks";
import VisibilitySensor from "./visibility-sensor";

export const OptimalAd = ({
  opts,
  containerStyle,
  renderAd,
  renderLoading,
}: {
  opts: GetAdOpts;
  containerStyle?: ViewProps["style"];
  renderAd: (decision: Decision) => ReactNode;
  renderLoading?: () => ReactNode;
}) => {
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
    return <Text>Loading...</Text>;
  }, [renderLoading]);

  const handleVisible = useCallback(async () => {
    const url = decision?.view_url;
    if (url) {
      console.log({ url });
      const response = await fetch(url);
      if (!response.ok) {
        console.warn(`Failed to load ad view: ${url}`);
      }
    }
  }, [decision?.view_url]);

  const handleHidden = useCallback(
    async (visibleDurationInMillis: number | null) => {
      console.log({ visibleDurationInMillis });
      const url = decision?.view_time_url;

      if (url && visibleDurationInMillis) {
        console.log({ url, visibleDurationInMillis });
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
