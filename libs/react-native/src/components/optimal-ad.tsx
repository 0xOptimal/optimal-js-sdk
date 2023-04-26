import { useMemo, type ReactNode } from "react";
import { Text, View, type ViewProps } from "react-native";

import { type Decision, type GetAdOpts } from "@getoptimal/js-sdk";

import { useOptimalAd } from "../hooks";

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

  if (isLoading) {
    return <>{loading}</>;
  }

  if (error || !decision) {
    return <></>;
  }

  // TODO: implement viewport tracking here
  return <View style={containerStyle}>{ad}</View>;
};
