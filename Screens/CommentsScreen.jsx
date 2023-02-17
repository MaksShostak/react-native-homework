import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectAvatat, selectUserId } from "../reduxToolkit/auth/selectot-auth";
import {
  doc,
  addDoc,
  getDocs,
  collection,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

export const CommentsScreen = ({ route }) => {
  const [comments, setComents] = useState([]);
  const [inputComent, setInputComent] = useState("");
  const avatar = useSelector(selectAvatat);
  const userId = useSelector(selectUserId);
  const { postId } = route.params;
  console.log(comments);
  useEffect(() => {
    getAllComments();
  }, []);

  const onChangeInput = (text) => setInputComent(text);

  const createComment = async () => {
    const wayToPosts = doc(db, "posts", postId);
    const docRef = await addDoc(collection(wayToPosts, "comments"), {
      comment: inputComent,
      userId,
      userAvatar: avatar,
      createdat: Timestamp.now().toDate().toLocaleString(),
    });

    setInputComent("");
  };
  const getAllComments = async () => {
    const wayToPosts = doc(db, "posts", postId);
    let comments = [];
    const querySnapshot = await getDocs(collection(wayToPosts, "comments"));
    querySnapshot.forEach((doc) => {
      comments.push({ ...doc.data(), id: doc.id });
    });

    setComents(comments);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Image
          source={{ uri: route.params.photoURL }}
          style={{
            height: 240,
            borderRadius: 8,
          }}
        />
      </View>
      <View
        style={{
          marginTop: 32,
          marginHorizontal: 16,
        }}
      >
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <View style={styles.commentContainer}>
                <View
                  style={{
                    height: 28,
                    width: 28,
                    borderRadius: 100,
                    borderWidth: 1,
                    marginRight: 16,
                  }}
                >
                  <Image
                    source={{ uri: item.userAvatar }}
                    style={{ width: 28, height: 28, borderRadius: 100 }}
                  />
                </View>

                <View style={styles.commentTextContainer}>
                  <Text
                    style={{
                      alignSelf: "flex-start",
                    }}
                  >
                    {item.comment}
                  </Text>
                  <Text style={{ alignSelf: "flex-end", color: "#BDBDBD" }}>
                    {item.createdat}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>

      <View
        style={{
          marginHorizontal: 16,
          marginTop: 6,
          marginBottom: 16,
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="Comment"
          onChangeText={onChangeInput}
          // onFocus={showKeyboard}
          value={inputComent}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={createComment}
        >
          <AntDesign name="arrowup" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
    height: 50,
    marginTop: 16,
    paddingLeft: 16,
    fontSize: 16,
    color: "#212121",
    fontFamily: "Roboto_400Regular",
  },
  button: {
    position: "absolute",
    top: 24,
    right: 8,
    height: 34,
    width: 34,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  commentContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  commentTextContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    flex: 1,
    borderRadius: 6,
    marginBottom: 24,
  },
  container: {
    height: 240,
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 32,
  },
});
