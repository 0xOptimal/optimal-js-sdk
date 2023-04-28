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

  const handleVisible = useCallback(() => {
    console.log("visible");
  }, []);

  const handleHidden = useCallback((visibleDuration: number | null) => {
    console.log({ visibleDuration });
  }, []);

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
