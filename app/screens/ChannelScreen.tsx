import React, { FC } from "react";
import { Text } from "@components/Text";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeArea } from "@components/SafeArea";
import { TouchableHighlight, View } from "react-native";
import { useFetchChannelVideos } from "../fetch/channels";
import { match, P } from "ts-pattern";
import { FlatList } from "react-native";
import { Preview } from "@components/Preview";
import { Loading } from "@components/Loading";

export const ChannelScreen: FC<
  NativeStackScreenProps<RootStackParamList, "Channel">
> = ({ navigation, route: { params } }) => {
  const query = useFetchChannelVideos(params.channelId);

  return (
    <SafeArea>
      <TouchableHighlight onPress={() => navigation.goBack()}>
        <Text>ChannelScreen</Text>
      </TouchableHighlight>

      {match(query)
        .with({ status: "initial" }, { status: "loading" }, () => (
          <View><Loading /></View>
        ))
        .with({ status: "error" }, (e) => <Text>{e.error.message as any}</Text>)
        .with({ status: "success" }, ({ data: { items } }) => (
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.videoId}
            renderItem={({ item }) => (
              <Preview
                title={item.snippet.title}
                subtitle="mimmo"
                imgSrc={item.snippet.thumbnails.default.url}
              />
            )}
          />
        ))
        .exhaustive()}
    </SafeArea>
  );
};
