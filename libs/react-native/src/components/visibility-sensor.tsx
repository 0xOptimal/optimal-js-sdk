import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FC,
  type ReactNode,
  type Ref,
} from "react";
import { Dimensions, View, type ViewProps } from "react-native";

export interface DimensionData {
  rectTop: number;
  rectBottom: number;
  rectWidth: number;
}

export interface Props {
  onChange?(visible: boolean): void;
  onVisible?(becameVisibleAt: number): void | Promise<void>;
  onHidden?(visibleDurationInMillis: number | null): void | Promise<void>;
  children: ReactNode;
  style?: ViewProps["style"];
}

export const VisibilitySensor: FC<Props> = ({
  children,
  onChange,
  onVisible,
  onHidden,
  style,
}) => {
  const myView: Ref<View> = useRef(null);
  const lastValue = useRef<boolean | null>(null);
  const [dimensions, setDimensions] = useState<DimensionData>({
    rectTop: 0,
    rectBottom: 0,
    rectWidth: 0,
  });

  const becameVisibleAt = useRef<number | null>(null);

  const handleVisible = useCallback(() => {
    becameVisibleAt.current = Date.now();
    Promise.resolve(onVisible?.(becameVisibleAt.current)).catch(() => null);
  }, [onVisible]);

  const handleHidden = useCallback(() => {
    const now = Date.now();
    const visibleDuration = becameVisibleAt.current
      ? now - becameVisibleAt.current
      : null;
    Promise.resolve(onHidden?.(visibleDuration)).catch(() => null);
    becameVisibleAt.current = null;
  }, [onHidden]);

  const isInViewPort = useCallback(
    (dims: DimensionData) => {
      const window = Dimensions.get("window");
      const isVisible =
        dims.rectBottom !== 0 &&
        dims.rectTop >= 0 &&
        dims.rectBottom <= window.height &&
        dims.rectWidth > 0 &&
        dims.rectWidth <= window.width;

      if (lastValue.current !== isVisible) {
        lastValue.current = isVisible;
        onChange?.(isVisible);

        if (isVisible) {
          handleVisible();
        } else {
          handleHidden();
        }
      }
    },
    [onChange, handleVisible, handleHidden],
  );

  const hiddenRef = useRef(handleHidden);
  useEffect(() => {
    hiddenRef.current = handleHidden;
  }, [handleHidden]);

  useEffect(() => {
    return () => {
      hiddenRef.current();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!myView || !myView.current) {
        return;
      }

      myView.current.measure(
        (
          _x: number,
          _y: number,
          width: number,
          height: number,
          pageX: number,
          pageY: number,
        ) => {
          setDimensions({
            rectTop: pageY,
            rectBottom: pageY + height,
            rectWidth: pageX + width,
          });
        },
      );
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    isInViewPort({
      rectBottom: dimensions.rectBottom,
      rectTop: dimensions.rectTop,
      rectWidth: dimensions.rectWidth,
    });
  }, [
    dimensions.rectTop,
    dimensions.rectBottom,
    dimensions.rectWidth,
    isInViewPort,
  ]);

  return (
    <View style={style} collapsable={false} ref={myView}>
      {children}
    </View>
  );
};

export default VisibilitySensor;
