import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomepageScreen } from "./app/screens/HomepageScreen";
import { colors } from "@colors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChannelScreen } from "./app/screens/ChannelScreen";

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
        <NavigationContainer
          theme={{
            colors: {
              background: colors.lightGray,
              border: "transparent",
              card: colors.lightGray,
              notification: colors.green,
              primary: colors.orange,
              text: colors.black,
            },
            dark: false,
          }}
        >
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              headerTransparent: true,
            }}
          >
            <Stack.Screen name="Home" component={HomepageScreen} />
            <Stack.Screen name="Channel" component={ChannelScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
