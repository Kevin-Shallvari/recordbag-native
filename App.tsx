import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { SafeArea } from "./app/components/SafeArea";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomepageScreen } from "./app/screens/HomepageScreen";
import { colors } from "@colors";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

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
          <Stack.Screen name="HomepageScreen" component={HomepageScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
