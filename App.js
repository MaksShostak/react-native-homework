import { Provider, useSelector } from "react-redux";
import { useEffect } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./reduxToolkit/store";

import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_900Black,
} from "@expo-google-fonts/roboto";
import { Pacifico_400Regular } from "@expo-google-fonts/pacifico";

import { Main } from "./components/Main";

export default function App() {
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
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <Main />
      {/* </PersistGate> */}
    </Provider>
  );
}
