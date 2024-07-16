import React, { FC } from "react";
import { fontScale, Text } from "@components/Text";
import { SafeArea } from "@components/SafeArea";
import { Image, View, StyleSheet } from "react-native";
import RecordBagLogo from "@images/record-bag-icon.svg";
import { SvgUri } from "react-native-svg";
import { colors } from "@colors";

export const HomepageScreen: FC = () => {
  return (
    <SafeArea>
      <View style={styles.container}>
        <View style={styles.header}>
          <RecordBagLogo fill={colors.lightGray} style={styles.icon} />
          <Text fontSize="h5" fontWeight="bold" color="lightGray">
            RecordBag
          </Text>
        </View>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.black,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  icon: {
    width: fontScale.h2,
    height: fontScale.h2,
  },
});
