import { useEffect, useState } from "react";
import { EvilIcons, FontAwesome } from "@expo/vector-icons";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";

import { db } from "../firebase/config";
import { useSelector } from "react-redux";
import { selectStateAuth } from "../reduxToolkit/auth/selectot-auth";

export const PostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const { avatar, name, email } = useSelector(selectStateAuth);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = () => {
    const post = [];
    const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
      snapshot.forEach((doc) => {
        post.push({ ...doc.data(), id: doc.id });
      });
      setPosts(post);
    });
  };

  // const getAllPosts = async () => {
  //   let post = [];
  //   const querySnapshot = await getDocs(collection(db, "posts"));
  //   querySnapshot.forEach((doc) => {
  //     post.push({ ...doc.data(), id: doc.id });
  //   });

  //   setPosts(post);
  // };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View style={styles.listContainer}>
        <View style={styles.avatarContainer}>
          <Image style={styles.avatar} source={{ uri: avatar }} />

          <View>
            <Text
              style={styles.userName}
              onPress={() => {
                navigation.navigate("ProfileScreen");
              }}
            >
              {name}
            </Text>
            <Text style={styles.userEmail}>{email}</Text>
          </View>
        </View>
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <View style={styles.container}>
                <Image source={{ uri: item.photo }} style={styles.image} />
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
                    <Text style={{ marginLeft: 6 }}> 0 </Text>

                    {/* <EvilIcons
                      name="like"
                      size={24}
                      color="#FF6C00"
                      style={{ marginLeft: 24 }}
                    />
                    <Text style={{ marginLeft: 6 }}> {0} </Text> */}
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
