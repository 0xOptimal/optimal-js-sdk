import { type OptimalPredefinedAdProps } from "../../types";
import { ImageAdBody } from "../ad-body";
import { OptimalCustomAd } from "./optimal-custom-ad";

export const OptimalAd = (props: OptimalPredefinedAdProps) => {
  return (
    <OptimalCustomAd
      {...props}
      renderAd={(decision) => {
        if (decision.image) {
          return (
            <ImageAdBody
              renderLoading={props.renderLoading}
              decision={decision}
            />
          );
        } else {
          console.warn(
            "Unsupported ad type: Either use OptimalCustomAd component manually or contact Optimal team",
          );
          return <></>;
        }
      }}
    />
  );
};
