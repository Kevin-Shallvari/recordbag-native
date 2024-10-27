import { colors } from "@colors";
import React, { FC } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text } from "./Text";

interface Props {
  title: string;
  imgSrc: string;
}

export const Preview: FC<Props> = ({ imgSrc, title }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: imgSrc }} />
      <View style={styles.infoContainer}>
        <Text fontSize="h6" fontWeight="bold">
          {title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderColor: colors.black,
    borderWidth: 2,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    objectFit: "cover",
  },
  infoContainer: {
    flexWrap: "wrap",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
});
