import { useCallback, useMemo } from "react";
import { Image } from "react-native";
import {
  URL as PolyURL,
  URLSearchParams as PolyURLSearchParams,
} from "react-native-url-polyfill";
import { useQuery } from "@tanstack/react-query";

import { type Decision } from "@getoptimal/js-sdk";

import { optimalQueryContext } from "./use-optimal";

const TypedUrl: typeof URL = PolyURL as never;
const TypedURLSearchParams: typeof URLSearchParams =
  PolyURLSearchParams as never;

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
    const imageUrl = new TypedUrl(decision.image);

    const imageSearchEntries = [...imageUrl.searchParams.entries()];
    const filteredSearchEntries = imageSearchEntries.filter(
      ([key]) => !["AWSAccessKeyId", "Signature", "Expires"].includes(key),
    );
    const newSearch = new TypedURLSearchParams(filteredSearchEntries);
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
