import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { FC } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { fontScale } from "@typography";
import { colors } from "@colors";

export const BackArrow: FC<NativeStackNavigationProp<any, never, undefined>> = ({
  goBack,
}) => {
  return (
    <Ionicons
      name="arrow-back"
      size={fontScale.h4}
      onPress={() => goBack()}
      color={colors.black}
    />
  );
};
