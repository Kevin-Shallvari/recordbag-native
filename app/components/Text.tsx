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
import { TextProps } from "react-native";

type FontSize = keyof typeof fontScale;
type FontWeight = "normal" | "bold" | "semi-bold" | "light";
type Props = TextProps & {
  fontSize?: FontSize;
  fontWeight?: FontWeight;
  color?: Colors;
};

export const Text: FC<PropsWithChildren<Props>> = ({
  children,
  style,
  fontSize = "p",
  color = "black",
  fontWeight = "normal",
  ...props
}) => {
  return (
    <DefaultText
      {...props}
      style={[styles({ fontSize, fontWeight, color }).text, style]}
    >
      {children}
    </DefaultText>
  );
};

const styles = (
  args: Pick<Required<Props>, "fontSize" | "fontWeight" | "color">
) =>
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
