import { Text, View, StyleSheet } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
const Tabs = createBottomTabNavigator();

import { PostsScreen } from "./PostsScreen";
import { CreatePostsScreen } from "./CreatePostsScreen";
import { ProfileScreen } from "./ProfileScreen";

export const HomeScreen = () => {
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
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          title: "Posts",
          headerStyle: {
            // backgroundColor: "#ffffff",
          },
          headerTitleAlign: "center",

          headerRight: () => (
            <View style={{ marginRight: 20 }}>
              <Feather
                name="log-out"
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
        options={({ navigation }) => ({
          headerLeft: () => (
            <View style={{ marginLeft: 20 }}>
              <MaterialIcons
                name="keyboard-backspace"
                size={24}
                color="black"
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
          //   tabBarActiveBackgroundColor: "orange",
          title: "Create Post ",
          headerTitleAlign: "center",
          //   tabBarStyle: { backgroundColor: "grey" },
        })}
      />

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
