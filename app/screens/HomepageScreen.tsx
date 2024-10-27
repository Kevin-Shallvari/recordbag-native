import React, { FC } from "react";
import { Text } from "@components/Text";
import { SafeArea } from "@components/SafeArea";
import {
  FlatList,
  View,
  StyleSheet,
  TouchableHighlight,
  ImageBackground,
  Image,
} from "react-native";
import { colors } from "@colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Loading } from "@components/Loading";
import { FetchAllChannels, fetchAllChannels } from "../api/channels";
import { match } from "ts-pattern";
import * as E from "effect/Effect";
import { useQuery } from "@tanstack/react-query";
import { pipe } from "effect";
import { isPostGresError } from "../utils/typeguards";
import Texture from "@images/cardboard-texture.png";

const handleError = (e: any) => {
  console.log(e.nativeEvent.error);
};

const img = require("../assets/images/cardboard-texture.png");
export const HomepageScreen: FC<
  NativeStackScreenProps<RootStackParamList, "Home">
> = ({ navigation }) => {
  const data = useQuery<FetchAllChannels, never>({
    queryKey: ["fetch-all-channels"],
    queryFn: () => E.runPromiseExit(fetchAllChannels),
    retry: false,
    staleTime: Infinity,
  });

  return (
    <SafeArea>
      {match(data)
        .with({ status: "pending" }, () => <Loading />)
        .with({ status: "success" }, ({ data }) =>
          pipe(
            data,
            E.match({
              onFailure: (error) => (
                <Text>
                  {isPostGresError(error) ? error.code : error.message}
                </Text>
              ),
              onSuccess: (data) => (
                <View style={styles.allChannelsContainer}>
                  <Text color="black" fontWeight="bold" fontSize="h2">
                    DIG IN AND START YOUR COLLECTION
                  </Text>

                  <FlatList
                    style={styles.channelFlatList}
                    data={data}
                    keyExtractor={(item) => item.id}
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
                        activeOpacity={1}
                        style={styles.thumbnailTouch}
                      >
                        <ImageBackground source={img} style={styles.cardboard}>
                          <Image
                            style={styles.thumbnail}
                            source={{ uri: item.thumbnail }}
                          />
                          <Text style={styles.label} fontWeight="bold">
                            {item.title}
                          </Text>
                        </ImageBackground>
                      </TouchableHighlight>
                    )}
                  />
                </View>
              ),
            }),
            E.runSync
          )
        )
        .run()}
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  thumbnail: {
    aspectRatio: 1,
    height: 50,
    borderColor: colors.lightGray,
    marginRight: 8,
  },
  allChannelsContainer: {
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
    flexDirection: "row",
  },
  label: {
    textAlign: "center",
    textTransform: "uppercase",
  },
  cardboard: {
    flex: 1,
    flexDirection: "row",
    padding: 16,
    backgroundColor: colors.green,
  },
});
