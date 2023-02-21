import { useDispatch, useSelector } from "react-redux";
import { EvilIcons, FontAwesome, Feather, AntDesign } from "@expo/vector-icons";
import { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";

import { Background } from "../components/Background";
const BackgroundImg = require("../assets/images/Photo.jpg");

import { selectStateAuth } from "../reduxToolkit/auth/selector-auth";
import { selectPosts } from "../reduxToolkit/dashboard/selector-posts";
import { authLogout } from "../reduxToolkit/auth/operations-auth";
import {
  featchUsersPosts,
  deletePost,
} from "../reduxToolkit/dashboard/oparations-posts";

export const ProfileScreen = ({ navigation }) => {
  const userPosts = useSelector(selectPosts);
  const { name, userId, avatar } = useSelector(selectStateAuth);
  const diispatch = useDispatch();

  useEffect(() => {
    diispatch(featchUsersPosts(userId));
  }, []);

  const logOut = () => diispatch(authLogout());

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Background img={BackgroundImg} styleBtn={styles.background}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: avatar }}
            style={{ width: 120, height: 120, borderRadius: 16 }}
          />
          <Text style={styles.userName}>{name}</Text>
        </View>
        <View style={styles.listContainer}>
          <View
            style={{
              marginRight: 20,
              position: "absolute",
              top: 20,
              right: 0,
            }}
          >
            <Feather name="log-out" size={24} color="black" onPress={logOut} />
          </View>
          <FlatList
            data={userPosts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return (
                <View style={styles.container}>
                  {item.photo && (
                    <Image source={{ uri: item.photo }} style={styles.image} />
                  )}
                  <View style={{ marginTop: 8, marginHorizontal: 16 }}>
                    <Text
                      style={{
                        alignSelf: "flex-start",
                        fontSize: 16,
                        fontFamily: "Roboto_500Medium",
                      }}
                    >
                      {item.title}
                    </Text>
                  </View>
                  <View style={styles.iconsContainer}>
                    <View
                      style={{ flexDirection: "row", alignItems: "baseline" }}
                    >
                      <FontAwesome
                        name="comment"
                        size={24}
                        color="#FF6C00"
                        style={{}}
                        onPress={() => {
                          navigation.navigate("CommentsScreen", {
                            postId: item.id,
                            photoURL: item.photo,
                          });
                        }}
                      />
                      <Text style={{ marginLeft: 6 }}>
                        {item.commentsCount ? item.commentsCount : 0}
                      </Text>

                      <AntDesign
                        name="like1"
                        size={24}
                        color="#FF6C00"
                        style={{ marginLeft: 24 }}
                      />
                      <Text style={{ marginLeft: 6 }}>
                        {" "}
                        {item.likes ? item.likes.length : 0}{" "}
                      </Text>
                    </View>
                    <View
                      style={{ flexDirection: "row", alignItems: "baseline" }}
                    >
                      <AntDesign
                        name="delete"
                        size={24}
                        color="black"
                        onPress={() => {
                          diispatch(deletePost({ id: item.id }));
                        }}
                      />
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
                        style={{
                          marginLeft: 8,
                        }}
                      />
                      <Text
                        style={{
                          marginLeft: 4,
                          textDecorationLine: "underline",
                        }}
                      >
                        {item.place}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </Background>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    paddingTop: 100,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 16,
    alignSelf: "center",
    zIndex: 2,
    backgroundColor: "#F6F6F6",
    position: "absolute",
    top: 40,
  },
  userName: {
    alignSelf: "center",
    fontSize: 30,
    marginTop: 32,
    fontFamily: "Roboto_500Medium",
  },
  listContainer: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "white",
    paddingTop: 160,
    flex: 1,
  },
  container: {
    flex: 1,
  },
  image: {
    height: 240,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  iconsContainer: {
    marginHorizontal: 16,
    flexDirection: "row",
    marginTop: 8,
    marginBottom: 32,
    alignItems: "baseline",
    justifyContent: "space-between",
  },
});
