import { Img } from "react-image";

import { type Decision } from "@getoptimal/js-sdk";
import { type OptimalAdProps } from "@getoptimal/react-helpers";

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

export const ImageAdBody = ({
  decision,
  renderLoading,
  className,
}: {
  decision: Decision;
  renderLoading?: OptimalAdProps["renderLoading"];
  className?: ImageProps["className"];
}) => {
  const imageSize = decision.image_size
    ? {
        width: decision.image_size[0],
        height: decision.image_size[1],
      }
    : undefined;

  if (!decision.image) {
    return <></>;
  }

  return (
    <Img
      src={decision.image}
      className={className}
      style={{
        aspectRatio: imageSize ? imageSize.width / imageSize.height : undefined,
      }}
      loader={renderLoading ? <>{renderLoading()}</> : <></>}
    />
  );
};
