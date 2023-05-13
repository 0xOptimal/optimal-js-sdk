import { type ReactNode } from "react";

import { type Decision, type GetAdOpts } from "@getoptimal/js-sdk";

export type OptimalAdProps<CS = Record<string, string>> = {
  opts: GetAdOpts;
  containerStyle?: CS;
  renderAd: (decision: Decision) => ReactNode;
  renderLoading?: () => ReactNode;
  onViewStart?: () => void;
  onViewEnd?: () => void;
};

export type OptimalPredefinedAdProps = Omit<OptimalAdProps, "renderAd">;
