import React, { FC, useEffect } from "react";
import { Text } from "@components/Text";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeArea } from "@components/SafeArea";
import { TouchableHighlight } from "react-native";
import { fetchChannelVideos } from "../fetch/channels";
import { fold3, RemoteData } from "@devexperts/remote-data-ts";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "@components/Loading";

export const ChannelScreen: FC<
  NativeStackScreenProps<RootStackParamList, "Channel">
> = ({ navigation, route: { params } }) => {
  const query = useQuery({
    queryKey: ["videos", params.channelId],
    queryFn: () => fetchChannelVideos(params.channelId),
  });

  return (
    <SafeArea>
      <TouchableHighlight onPress={() => navigation.goBack()}>
        <Text>ChannelScreen</Text>
      </TouchableHighlight>

    </SafeArea>
  );
};
