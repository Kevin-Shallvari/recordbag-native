import "./global";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer, Theme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomepageScreen } from "./app/screens/HomepageScreen";
import { colors } from "@colors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChannelScreen } from "./app/screens/ChannelScreen";
import { VideoScreen } from "./app/screens/VideoScreen";
import RecordBagLogo from "@images/record-bag-icon.svg";
import { fontScale } from "@typography";
import { StyleSheet } from "react-native";
import { BackArrow } from "@components/BackArrow";

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "SpaceGrotesk-Bold": require("./app/assets/fonts/SpaceGrotesk-Bold.ttf"),
    "SpaceGrotesk-Light": require("./app/assets/fonts/SpaceGrotesk-Light.ttf"),
    "SpaceGrotesk-Regular": require("./app/assets/fonts/SpaceGrotesk-Regular.ttf"),
    "SpaceGrotesk-Medium": require("./app/assets/fonts/SpaceGrotesk-Medium.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer theme={theme}>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomepageScreen}
              options={{
                title: "Record Bag",
                headerStyle: {
                  backgroundColor: colors.black,
                },
                headerTitleStyle: {
                  color: colors.lightGray,
                  fontSize: fontScale.h4,
                  fontWeight: "bold",
                  fontFamily: "SpaceGrotesk-Bold",
                },
                statusBarColor: colors.black,
                headerLeft: () => (
                  <RecordBagLogo fill={colors.lightGray} style={styles.icon} />
                ),
              }}
            />
            <Stack.Screen
              name="Channel"
              component={ChannelScreen}
              options={({ route: { params }, navigation }) => ({
                title: params.title,
                headerTitle: params.title + " Shop",
                headerStyle: {
                  backgroundColor: colors.orange,
                },
                statusBarColor: colors.orange,
                headerLeft: () => <BackArrow {...navigation} />,
              })}
            />
            <Stack.Screen
              name="Video"
              component={VideoScreen}
              options={({ navigation }) => ({
                title: "Listen",
                statusBarColor: colors.green,
                headerStyle: {
                  backgroundColor: colors.green,
                },
                headerLeft: () => <BackArrow {...navigation} />,
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: fontScale.h2,
    height: fontScale.h2,
    marginRight: fontScale.p / 2,
  },
});

const theme: Theme = {
  colors: {
    background: colors.lightGray,
    border: "transparent",
    card: colors.lightGray,
    notification: colors.green,
    primary: colors.orange,
    text: colors.black,
  },
  dark: false,
};
