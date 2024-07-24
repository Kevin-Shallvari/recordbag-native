import { colors } from "@colors";
import React, { FC } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text } from "./Text";

interface Props {
  title: string;
  subtitle: string;
  imgSrc: string;
}

export const Preview: FC<Props> = ({ imgSrc, subtitle, title }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: imgSrc }} />
      <View style={styles.infoContainer}>
        <Text fontSize="h5" fontWeight="bold" style={styles.text}>
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
  },
  image: {
    width: 100,
    height: 100,
    objectFit: "cover",
  },
  infoContainer: {
    flexWrap: "wrap",
    paddingHorizontal: 8,
    flex: 1,
    flexDirection: "row",
  },
  text: {
  },
});
