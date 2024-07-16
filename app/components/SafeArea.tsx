
import React, { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const SafeArea: React.FC<PropsWithChildren> = ({ children }) => {
  return <SafeAreaView style={style.container}>{children}</SafeAreaView>;
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },
});
