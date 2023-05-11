import { type ReactNode } from "react";
import { type ViewProps } from "react-native/types";

import { type Decision, type GetAdOpts } from "@getoptimal/js-sdk";

export type OptimalAdProps = {
  opts: GetAdOpts;
  containerStyle?: ViewProps["style"];
  renderAd: (decision: Decision) => ReactNode;
  renderLoading?: () => ReactNode;
};

export type OptimalPredefinedAdProps = Omit<OptimalAdProps, "renderAd">;
