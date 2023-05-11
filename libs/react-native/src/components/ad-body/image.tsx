import { Image, type ImageProps } from "react-native";

import { type Decision } from "@getoptimal/js-sdk";
import { type OptimalAdProps } from "@getoptimal/react-helpers";

import { useImageSize } from "../../hooks";

export const ImageAdBody = ({
  decision,
  renderLoading,
  style,
}: {
  decision: Decision;
  renderLoading?: OptimalAdProps["renderLoading"];
  style?: ImageProps["style"];
}) => {
  const { hasImage, imageSize, isLoading } = useImageSize(decision);

  if (!hasImage) {
    return <></>;
  }

  if (isLoading) {
    if (renderLoading) {
      return <>{renderLoading()}</>;
    }
    return <></>;
  }

  return (
    <Image
      source={{ uri: decision.image }}
      resizeMode="contain"
      style={[
        style,
        {
          aspectRatio: imageSize
            ? imageSize.width / imageSize.height
            : undefined,
        },
      ]}
    />
  );
};
