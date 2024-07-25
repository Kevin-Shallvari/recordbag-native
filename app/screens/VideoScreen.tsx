import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { Text } from "@components/Text";
import { SafeArea } from "@components/SafeArea";
import { View } from "react-native";

export const VideoScreen: FC<
  NativeStackScreenProps<RootStackParamList, "Video">
> = ({ navigation, route: { params } }) => {
  return (
    <SafeArea>
      <View>
        <Text onPress={() => navigation.goBack()}>VideoScreen</Text>
      </View>
    </SafeArea>
  );
};
