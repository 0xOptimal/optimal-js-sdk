import { useCallback, useMemo } from "react";
import { Image } from "react-native";
import { URL, URLSearchParams } from "react-native-url-polyfill";
import { useQuery } from "@tanstack/react-query";

import { type Decision } from "@getoptimal/js-sdk";

import { optimalQueryContext } from "./use-optimal";

export const useImageSize = (decision?: Decision) => {
  const getImageSize = useCallback(() => {
    return new Promise<{ width: number; height: number } | undefined>(
      (resolve) => {
        if (decision?.image && !decision?.image_size) {
          Image.getSize(decision.image, (width, height) =>
            resolve({ width, height }),
          );
          return;
        } else if (decision?.image && decision?.image_size) {
          const [width, height] = decision.image_size;
          resolve({
            width,
            height,
          });
          return;
        } else {
          resolve(undefined);
          return;
        }
      },
    );
  }, [decision?.image, decision?.image_size]);

  const sizeKey = useMemo(() => {
    if (!decision?.image) {
      return;
    }
    const imageUrl = new URL(decision.image);

    const imageSearchEntries = [...imageUrl.searchParams.entries()];
    const filteredSearchEntries = imageSearchEntries.filter(
      ([key]) => !["AWSAccessKeyId", "Signature", "Expires"].includes(key),
    );
    const newSearch = new URLSearchParams(filteredSearchEntries);
    imageUrl.search = newSearch.toString();
  }, [decision?.image]);

  const { data: imageSize, isLoading } = useQuery(
    [sizeKey, "size"],
    getImageSize,
    {
      enabled: !!decision?.image,
      context: optimalQueryContext,
    },
  );

  return { imageSize, hasImage: !!decision?.image, isLoading };
};
