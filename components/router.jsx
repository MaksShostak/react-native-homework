import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  HomeScreen,
  CommentsScreen,
  Login,
  MapScreen,
  Registration,
} from "../Screens";

const Stack = createNativeStackNavigator();

export const useRoute = (isLogged) => {
  if (!isLogged) {
    return (
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen
          name="Register"
          component={Registration}
          options={{
            title: "Register",
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: "Login",
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false, title: "HomeScreen" }}
      />
      <Stack.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
          title: "CommentsScreen",
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          title: "MapScreen",
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
};
