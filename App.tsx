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
          <Stack.Navigator screenOptions={{ statusBarColor: colors.orange }}>
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
                  fontSize: fontScale.h3,
                  fontWeight: "bold",
                  fontFamily: "SpaceGrotesk-Bold",
                },
                headerLeft: () => (
                  <RecordBagLogo fill={colors.lightGray} style={styles.icon} />
                ),
              }}
            />
            <Stack.Screen
              name="Channel"
              component={ChannelScreen}
              options={({ route: { params } }) => ({
                title: params.title,
                headerTitle: params.title + " Shop",
                headerStyle: {
                  backgroundColor: colors.orange,
                },
                headerBackVisible: true,
              })}
            />
            <Stack.Screen name="Video" component={VideoScreen} />
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
