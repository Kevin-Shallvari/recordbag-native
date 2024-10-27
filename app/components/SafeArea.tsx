import React, { PropsWithChildren } from "react";
import { StyleSheet, Platform, SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const SafeArea: React.FC<PropsWithChildren> = ({ children }) => {
  const { bottom, left, right, top } = useSafeAreaInsets();
  return (
    <SafeAreaView
      style={[
        style.container,
        Platform.OS === "android" && {
          paddingTop: top,
          paddingBottom: bottom,
          paddingLeft: left,
          paddingRight: right,
        },
      ]}
    >
      {children}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
