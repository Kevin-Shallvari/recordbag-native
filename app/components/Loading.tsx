import React, { FC, forwardRef, SVGProps, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  ReduceMotion,
} from "react-native-reanimated";
import { Svg, Circle, Path, SvgProps } from "react-native-svg";

const VynilIcon = forwardRef<Svg, SvgProps>((props, ref) => (
  <Svg ref={ref} {...props} viewBox="0 0 512 512">
    <Circle cx="256" cy="256" r="32" />
    <Path d="M256 0C114.617 0 0 114.615 0 256s114.617 256 256 256 256-114.615 256-256S397.383 0 256 0zm-88.719 443.851c-43.422-20.596-78.539-55.708-99.133-99.134l59.492-23.797a144.748 144.748 0 0 0 63.438 63.44l-23.797 59.491zM325.07 298.277c-5.969 11.35-15.449 20.826-26.797 26.797-75.438 39.682-151.031-35.92-111.344-111.353 5.969-11.35 15.449-20.826 26.797-26.796 75.438-39.682 151.032 35.921 111.344 111.352zm59.289-107.198a144.746 144.746 0 0 0-63.438-63.439l23.797-59.491c43.422 20.595 78.535 55.709 99.133 99.134l-59.492 23.796z" />
  </Svg>
));

const AnimatedIcon = Animated.createAnimatedComponent(VynilIcon);

export const Loading = () => {
  const rotation = useSharedValue("0deg");

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming("360deg", {
        duration: 500,
        easing: Easing.linear,
        reduceMotion: ReduceMotion.System,
      }),
      -1
    );
  }, []);

  return (
    <View style={styles.loadingContainer}>
      <AnimatedIcon
        style={[styles.icon, { transform: [{ rotate: rotation }] }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 100,
    height: 100,
  },
});
