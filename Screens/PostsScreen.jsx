import { useEffect, useState } from "react";
import { EvilIcons, FontAwesome, AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { selectStateAuth } from "../reduxToolkit/auth/selector-auth";
import {
  createLike,
  featchAllPosts,
} from "../reduxToolkit/dashboard/oparations-posts";
import { selectPosts } from "../reduxToolkit/dashboard/selector-posts";
export const PostsScreen = ({ navigation }) => {
  const posts = useSelector(selectPosts);
  const [like, setLike] = useState(false);
  const { avatar, name, email } = useSelector(selectStateAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(featchAllPosts());
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View style={styles.listContainer}>
        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={() => {
            navigation.navigate("ProfileScreen");
          }}
        >
          <Image style={styles.avatar} source={{ uri: avatar }} />

          <View>
            <Text style={styles.userName}>{name}</Text>
            <Text style={styles.userEmail}>{email}</Text>
          </View>
        </TouchableOpacity>
        <FlatList
          data={posts}
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
                  <View style={{ flexDirection: "row" }}>
                    <FontAwesome
                      name="comment-o"
                      size={24}
                      color="black"
                      style={{}}
                      onPress={() => {
                        navigation.navigate("CommentsScreen", {
                          postId: item.id,
                          photoURL: item.photo,
                        });
                      }}
                    />
                    <Text style={{ marginLeft: 6 }}>
                      {" "}
                      {item.commentsCount ? item.commentsCount : 0}{" "}
                    </Text>
                    <AntDesign
                      name="like1"
                      size={24}
                      color={like ? "black" : "#FF6C00"}
                      style={{ marginLeft: 24 }}
                      onPress={() => {
                        setLike((previousState) => !previousState);
                        dispatch(createLike({ postId: item.id, like }));
                      }}
                    />

                    <Text style={{ marginLeft: 6 }}>
                      {" "}
                      {item.likes ? item.likes.length : 0}{" "}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
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
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  avatarContainer: {
    flexDirection: "row",
    marginBottom: 32,
    marginHorizontal: 16,
    alignItems: "center",
  },
  userName: {
    fontSize: 13,
    fontFamily: "Roboto_900Black",
  },
  userEmail: {
    fontSize: 11,
    fontFamily: "Roboto_400Regular",
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 16,
    marginRight: 8,
  },

  listContainer: {
    backgroundColor: "white",
    paddingTop: 32,
    flex: 1,
  },
  container: {
    flex: 1,
  },
  iconsContainer: {
    marginHorizontal: 16,
    flexDirection: "row",
    marginTop: 8,
    marginBottom: 32,
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  image: {
    height: 240,
    borderRadius: 8,
    marginHorizontal: 16,
  },
});
