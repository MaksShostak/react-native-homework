import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";
import { Background } from "../components/Background";
import {
  selectAvatat,
  selectStateAuth,
  selectUserId,
} from "../reduxToolkit/auth/selectot-auth";
import { db } from "../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { EvilIcons, FontAwesome, Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
  doc,
} from "firebase/firestore";
import { authLogout } from "../reduxToolkit/auth/operations-auth";

const BackgroundImg = require("../assets/images/Photo.jpg");

export const ProfileScreen = ({ navigation }) => {
  const [userPosts, setUserPosts] = useState([]);

  const { name, userId, avatar } = useSelector(selectStateAuth);
  const diispatch = useDispatch();

  useEffect(() => {
    getUserPosts();
  }, []);

  const logOut = () => diispatch(authLogout());

  const countComment = (id) => {
    const wayToPosts = doc(db, "posts", id);
    const q = query(collection(wayToPosts, "comments"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const comments = [];
      querySnapshot.forEach((doc) => {
        comments.push({ ...doc.data(), id: doc.id });
      });
      return comments.length;
    });

    // const querySnapshot = getDocs(collection(wayToPosts, "comments"));
    // querySnapshot.forEach((doc) => {
    //   comments.push({ ...doc.data(), id: doc.id });
    // });
  };

  // const getUserPosts = async () => {
  //   let userPosts = [];
  //   const q = query(collection(db, "posts"), where("userId", "==", userId));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     userPosts.push({
  //       ...doc.data(),
  //       id: doc.id,
  //     });
  //   });
  //   setUserPosts(userPosts);
  // };

  const getUserPosts = () => {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const userPosts = [];
      querySnapshot.forEach((doc) => {
        userPosts.push({
          ...doc.data(),
          id: doc.id,
          // commentsNumber: countComment(doc.id),
        });
      });
      setUserPosts(userPosts);
    });
  };

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
                        {countComment(item.id)}
                      </Text>

                      <EvilIcons
                        name="like"
                        size={24}
                        color="#FF6C00"
                        style={{ marginLeft: 24 }}
                      />
                      <Text style={{ marginLeft: 6 }}> {0} </Text>
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
