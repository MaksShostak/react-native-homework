import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_900Black,
} from "@expo-google-fonts/roboto";
import { Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { useState, useEffect } from "react";

import { Registration } from "./Screens/RegistrationScreen";
import { Login } from "./Screens/LoginScreen";
import { Background } from "./components/Background";
import { Home } from "./Screens/Home";

const Stack = createNativeStackNavigator();
const BackgroundImg = require("./assets/images/Photo.jpg");

export default function App() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const hideKeyboard = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };
  const showKeyboard = () => {
    setIsShowKeyboard(true);
  };
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
    <NavigationContainer>
      <TouchableWithoutFeedback onPress={hideKeyboard}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{
            ...styles.container,
            marginBottom: isShowKeyboard ? 0 : 0,
          }}
        >
          <Stack.Navigator initialRouteName="Register">
            <Stack.Screen name="Register">
              {(props) => (
                <Background img={BackgroundImg} styleBtn={styles.background}>
                  <Registration
                    {...props}
                    showKeyboard={showKeyboard}
                    hideKeyboard={hideKeyboard}
                  />
                </Background>
              )}
            </Stack.Screen>
            <Stack.Screen name="Login">
              {(props) => (
                <Background img={BackgroundImg} styleBtn={styles.background}>
                  <Login
                    {...props}
                    showKeyboard={showKeyboard}
                    hideKeyboard={hideKeyboard}
                  />
                </Background>
              )}
            </Stack.Screen>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ title: "HomePage" }}
            />
          </Stack.Navigator>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
});
