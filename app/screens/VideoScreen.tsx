import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { SafeArea } from "@components/SafeArea";
import { View } from "react-native";
import { Text } from "@components/Text";
import YoutubePlayer, { PLAYER_STATES } from "react-native-youtube-iframe";
import { colors } from "@colors";
import { Loading } from "@components/Loading";

export type PlayerStates = PLAYER_STATES | "LOADING";

export const VideoScreen: FC<
  NativeStackScreenProps<RootStackParamList, "Video">
> = ({ route: { params } }) => {
  const [playing, setPlaying] = React.useState<PlayerStates>("LOADING");

  return (
    <SafeArea>
      {playing === "LOADING" ? <Loading /> : null}
      <View
        style={[
          style.container,
          { display: playing === "LOADING" ? "none" : "flex" },
        ]}
      >
        <View style={style.playerContainer}>
          <Text style={{ marginBottom: 16 }} fontSize="h4" fontWeight="bold">
            {params.title}
          </Text>
          <YoutubePlayer
            onReady={() => setPlaying(PLAYER_STATES.UNSTARTED)}
            height={300}
            play={playing === PLAYER_STATES.PLAYING}
            videoId={params.videoId}
            volume={100}
            onChangeState={setPlaying}
          />
        </View>
      </View>
    </SafeArea>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  playerContainer: {
    paddingTop: 8,
    borderColor: colors.black,
    borderTopWidth: 4,
  },
});
