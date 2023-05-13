import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
} from "react";
import { InView } from "react-intersection-observer";

import { type OptimalAdProps } from "@getoptimal/react-helpers";

import { useOptimalAd } from "../../hooks";

export const OptimalCustomAd = ({
  opts,
  containerStyle,
  renderAd,
  renderLoading,
  onViewStart,
  onViewEnd,
}: OptimalAdProps<CSSProperties>) => {
  const { decision, error, isLoading, trackView, trackViewTime } =
    useOptimalAd(opts);

  const viewUrlRef = useRef(decision?.view_url);
  const viewTimeUrlRef = useRef(decision?.view_time_url);

  const viewTracked = useRef(false);
  const viewTimeTracked = useRef(false);

  useEffect(() => {
    if (viewUrlRef.current !== decision?.view_url) {
      viewTracked.current = false;
    }

    if (viewTimeUrlRef.current !== decision?.view_time_url) {
      viewTimeTracked.current = false;
    }

    viewUrlRef.current = decision?.view_url;
    viewTimeUrlRef.current = decision?.view_time_url;
  }, [decision?.view_time_url, decision?.view_url]);

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
    return <></>;
  }, [renderLoading]);

  const becameVisibleAt = useRef<number | null>(null);

  const handleVisible = useCallback(async () => {
    becameVisibleAt.current = Date.now();
    onViewStart?.();
    await trackView();
  }, [onViewStart, trackView]);

  const handleHidden = useCallback(async () => {
    if (!becameVisibleAt.current) {
      return;
    }
    const visibleDurationInMillis = Date.now() - becameVisibleAt.current;
    becameVisibleAt.current = null;
    onViewEnd?.();
    await trackViewTime(visibleDurationInMillis);
  }, [onViewEnd, trackViewTime]);

  useEffect(() => {
    return () => {
      handleHidden().catch(() => null);
    };
  }, [handleHidden]);

  if (isLoading) {
    return <>{loading}</>;
  }

  if (error || !decision) {
    return <></>;
  }

  return (
    <InView
      as="div"
      style={containerStyle}
      threshold={0.5}
      onChange={async (inView) => {
        if (inView) {
          await handleVisible();
        } else {
          await handleHidden();
        }
      }}
    >
      {ad}
    </InView>
  );
};
