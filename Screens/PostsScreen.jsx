import { useEffect, useState } from "react";
import { EvilIcons } from "@expo/vector-icons";

import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";

import { Background } from "../components/Background";
const BackgroundImg = require("../assets/images/Photo.jpg");

export const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Background img={BackgroundImg} styleBtn={styles.background}>
        <FlatList
          style={{
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            backgroundColor: "white",
          }}
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <View style={styles.container}>
                <Image
                  source={{ uri: item.photo }}
                  style={{
                    height: 240,
                    marginTop: 32,
                    borderRadius: 8,
                    marginHorizontal: 16,
                  }}
                />
                <View
                  style={{
                    height: 20,
                    marginTop: 8,
                  }}
                >
                  <Text
                    style={{ alignSelf: "flex-start", marginHorizontal: 16 }}
                  >
                    {item.title}
                  </Text>
                </View>
                <View
                  style={{
                    height: 20,
                    marginTop: 8,
                  }}
                >
                  <EvilIcons
                    name="comment"
                    size={24}
                    color="black"
                    style={{
                      // backgroundColor: "green",
                      position: "absolute",
                      top: 0,
                      left: 16,
                    }}
                    onPress={() => {
                      navigation.navigate("CommentsScreen", {
                        photoURL: item.photo,
                      });
                    }}
                  />
                  <EvilIcons
                    name="like"
                    size={24}
                    color="#FF6C00"
                    style={{ position: "absolute", top: 0, left: 80 }}
                  />
                  <Text
                    style={{
                      alignSelf: "flex-end",
                      marginHorizontal: 16,
                      textDecorationLine: "underline",
                    }}
                  >
                    <EvilIcons
                      name="location"
                      size={24}
                      color="black"
                      onPress={() => {
                        navigation.navigate("MapScreen", {
                          latitude: item.latitude,
                          longitude: item.longitude,
                        });
                      }}
                    />
                    {item.location}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </Background>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    paddingTop: 100,
  },
});
