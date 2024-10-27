import React, { FC } from "react";
import { Text } from "@components/Text";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeArea } from "@components/SafeArea";
import { TouchableHighlight, View, StyleSheet, Image } from "react-native";
import { fetchAllVideosFromChannel } from "../api/channels";
import { match } from "ts-pattern";
import { FlatList } from "react-native";
import { Preview } from "@components/Preview";
import { Loading } from "@components/Loading";
import * as E from "effect/Effect";
import { useQuery } from "@tanstack/react-query";
import { colors } from "@colors";

export const ChannelScreen: FC<
  NativeStackScreenProps<RootStackParamList, "Channel">
> = ({ navigation, route: { params } }) => {
  const query = useQuery({
    queryKey: ["videos", params.channelId],
    queryFn: () => E.runPromise(fetchAllVideosFromChannel(params.channelId)),
    staleTime: Infinity,
  });

  return (
    <SafeArea>
      {match(query)
        .with({ status: "pending" }, () => (
          <View style={styles.container}>
            <Loading />
          </View>
        ))
        .with({ status: "error" }, ({ error }) => <Text>{error.message}</Text>)
        .with({ status: "success" }, ({ data: { items } }) => (
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.videoId}
            ListHeaderComponent={
              <Image
                style={styles.thumbnail}
                source={{ uri: params.thumbnail }}
              />
            }
            renderItem={({ item }) => (
              <TouchableHighlight
                underlayColor={colors.green}
                onPress={() =>
                  navigation.push("Video", {
                    videoId: item.id.videoId,
                    title: item.snippet.title,
                  })
                }
              >
                <Preview
                  title={item.snippet.title}
                  imgSrc={item.snippet.thumbnails.default.url}
                />
              </TouchableHighlight>
            )}
          />
        ))
        .exhaustive()}
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnail: {
    height: 200,
    objectFit: "cover",
  },
});
