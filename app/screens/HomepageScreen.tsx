import React, { FC, useEffect } from "react";
import { fontScale, Text } from "@components/Text";
import { SafeArea } from "@components/SafeArea";
import {
  FlatList,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import { colors } from "@colors";
import { Channels } from "@models/channels";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Loading } from "@components/Loading";
import { Fetch, fetchAllChannels } from "../fetch/channels";
import { match } from "ts-pattern";

export const HomepageScreen: FC<
  NativeStackScreenProps<RootStackParamList, "Home">
> = ({ navigation }) => {
  const [shops, setShops] = React.useState<Fetch<Channels>>({
    status: "initial",
  });

  useEffect(() => {
    setShops({ status: "loading" });
    fetchAllChannels().then(setShops);
  }, []);

  return (
    <SafeArea>
      {match(shops)
        .with({ status: "initial" }, { status: "loading" }, () => (
          <View style={styles.loadingContainer}>
            <Loading />
          </View>
        ))
        .with({ status: "error" }, () => <Text>Error</Text>)
        .with({ status: "success" }, ({ data }) => (
          <View style={styles.allChannelsContainer}>
            <Text color="lightGray" fontWeight="bold" fontSize="h2">
              DIG IN AND START YOUR COLLECTION
            </Text>
            <FlatList
              columnWrapperStyle={{ gap: 8 }}
              contentContainerStyle={{ gap: 8 }}
              style={styles.channelFlatList}
              data={data}
              keyExtractor={(item) => item.id}
              numColumns={2}
              renderItem={({ item }) => (
                <TouchableHighlight
                  onPress={() =>
                    navigation.navigate("Channel", {
                      channelId: item.id,
                      thumbnail: item.thumbnail,
                      title: item.title,
                    })
                  }
                  underlayColor={colors.orange}
                  activeOpacity={0.5}
                  style={styles.thumbnailTouch}
                >
                  <View>
                    <Image
                      resizeMethod="resize"
                      style={styles.thumbnail}
                      source={{ uri: item.thumbnail }}
                    />
                    <Text style={styles.label} fontWeight="bold">
                      {item.title}
                    </Text>
                  </View>
                </TouchableHighlight>
              )}
            />
          </View>
        ))
        .exhaustive()}
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnail: {
    aspectRatio: 1,
    borderColor: colors.lightGray,
  },
  allChannelsContainer: {
    backgroundColor: colors.black,
    marginHorizontal: 16,
    padding: 16,
    marginTop: 16,
  },
  channelFlatList: {
    marginTop: 16,
  },
  thumbnailTouch: {
    padding: 8,
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  label: {
    textAlign: "center",
    textTransform: "uppercase",
  },
});
