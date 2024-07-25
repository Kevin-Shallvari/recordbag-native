import React, { FC } from "react";
import { Text } from "@components/Text";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeArea } from "@components/SafeArea";
import { TouchableHighlight, View, StyleSheet, Image } from "react-native";
import { useFetchChannelVideos } from "../fetch/channels";
import { match } from "ts-pattern";
import { FlatList } from "react-native";
import { Preview } from "@components/Preview";
import { Loading } from "@components/Loading";

export const ChannelScreen: FC<
  NativeStackScreenProps<RootStackParamList, "Channel">
> = ({ navigation, route: { params } }) => {
  const query = useFetchChannelVideos(params.channelId);

  return (
    <SafeArea>
      {match(query)
        .with({ status: "initial" }, { status: "loading" }, () => (
          <View style={styles.container}>
            <Loading />
          </View>
        ))
        .with({ status: "error" }, (e) => <Text>{e.error.message as any}</Text>)
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
                onPress={() =>
                  navigation.push("Video", { videoId: item.id.videoId })
                }
              >
                <Preview
                  title={item.snippet.title}
                  subtitle="mimmo"
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
  },
  thumbnail: {
    height: 200,
    objectFit: "cover",
  },
});
