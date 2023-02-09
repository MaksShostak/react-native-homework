import { Button, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";

//  tabBarIcon: ({ focused, size, color }) => {
//             <AntDesign name="appstore-o" size={24} color="black" />;
//           },
//    tabBarIcon: ({ focused, size, color }) => {
//             <Feather name="user" size={24} color="black" />;
//           },
//   tabBarIcon: ({ focused, size, color }) => {
//             <AntDesign name="plus" size={24} color="black" />;
//           },
import {
  Home,
  CommentsScreen,
  CreatePostsScreen,
  Login,
  MapScreen,
  PostsScreen,
  ProfileScreen,
  Registration,
} from "../Screens";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

export const useRoute = (isLogged) => {
  if (!isLogged) {
    return (
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen
          name="Register"
          component={Registration}
          options={{ title: "Register", headerShown: false }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login", headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
  return (
    <Tabs.Navigator
      initialRouteName="PostsScreen"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let background = null;
          let borderRadius = 0;
          let coloricon = "black";
          if (route.name === "PostsScreen") {
            iconName = focused ? "appstore-o" : "appstore-o";
          } else if (route.name === "CreatePostsScreen") {
            iconName = focused ? "plus" : "plus";
            // color = "white";

            background = "#FF6C00";
            borderRadius = 20;
          } else if (route.name === "ProfileScreen") {
            iconName = focused ? "user" : "user";
          }

          return (
            <View
              style={{
                backgroundColor: background,
                borderRadius: borderRadius,
                height: 40,
                width: 70,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AntDesign name={iconName} size={size} color={color} />
            </View>
          );
        },
        tabBarInactiveTintColor: "black",
        tabBarActiveTintColor: "red",
        // tabBarActiveBackgroundColor: "grey",
        // abBarInactiveBackgroundColor: "grey",
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: "#cfcbc8" },
      })}
    >
      {/* <Tabs.Screen
          name="Home"
          component={Home}
          options={{ title: "HomePage" }}
        /> */}
      {/* <Tabs.Screen
          name="CommentsScreen"
          component={CommentsScreen}
          options={{ title: "CommentsScreen" }}
        /> */}
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          title: "Posts",
          headerStyle: {
            backgroundColor: "ffffff",
          },
          headerTitleAlign: "center",

          headerRight: () => (
            <View style={{ marginRight: 20 }}>
              <AntDesign
                name="logout"
                size={24}
                color="black"
                onPress={() => alert("This is a button!")}
              />
            </View>
          ),
          headerTitleStyle: {
            // fontWeight: "bold",
            // fontSize: 20,
          },
        }}
      />
      <Tabs.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          //   tabBarActiveBackgroundColor: "orange",
          title: "Create Post ",
          headerTitleAlign: "center",

          //   tabBarStyle: { backgroundColor: "grey" },
        }}
      />
      {/* <Tabs.Screen
          name="MapScreen"
          component={MapScreen}
          options={{ title: "MapScreen" }}
        /> */}
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "Profile",
          headerTitleAlign: "center",
        }}
      />
    </Tabs.Navigator>
  );
};
