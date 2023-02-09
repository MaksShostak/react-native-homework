import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect } from "react";

import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_900Black,
} from "@expo-google-fonts/roboto";
import { Pacifico_400Regular } from "@expo-google-fonts/pacifico";

import { useRoute } from "./components/router";

export default function App() {
  const routing = useRoute(1);

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_900Black,
    Pacifico_400Regular,
  });
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return <NavigationContainer>{routing}</NavigationContainer>;
}
