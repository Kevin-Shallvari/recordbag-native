import React, { FC, PropsWithChildren } from "react";
import {
  Text as DefaultText,
  StyleSheet,
  StyleProp,
  TextStyle,
  Platform,
} from "react-native";
import { match } from "ts-pattern";
import { colors, Colors } from "@colors";
import { fontScale } from "@typography";

type FontSize = keyof typeof fontScale;
type FontWeight = "normal" | "bold" | "semi-bold" | "light";
type Props = {
  fontSize?: FontSize;
  style?: StyleProp<TextStyle>;
  fontWeight?: FontWeight;
  color?: Colors;
};

export const Text: FC<PropsWithChildren<Props>> = ({
  children,
  style,
  fontSize = "p",
  color = "black",
  fontWeight = "normal",
}) => {
  return (
    <DefaultText style={[styles({ fontSize, fontWeight, color }).text, style]}>
      {children}
    </DefaultText>
  );
};

const styles = (args: Omit<Required<Props>, "style">) =>
  StyleSheet.create({
    text: {
      fontFamily: match(args.fontWeight)
        .with("bold", () => "SpaceGrotesk-Bold")
        .with("semi-bold", () => "SpaceGrotesk-Medium")
        .with("light", () => "SpaceGrotesk-Light")
        .with("normal", () => "SpaceGrotesk-Regular")
        .exhaustive(),
      fontSize: fontScale[args.fontSize],
      color: colors[args.color],
    },
  });
export { fontScale };
