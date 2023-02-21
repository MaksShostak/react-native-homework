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
import { useDispatch, useSelector } from "react-redux";

import { selectAvatar, selectUserId } from "../reduxToolkit/auth/selector-auth";
import { selectComments } from "../reduxToolkit/dashboard/selector-posts";
import {
  getUpdatedComments,
  updatePost,
} from "../reduxToolkit/dashboard/oparations-posts";

export const CommentsScreen = ({ navigation, route }) => {
  const [inputComent, setInputComent] = useState("");
  const avatar = useSelector(selectAvatar);
  const userId = useSelector(selectUserId);
  const { postId } = route.params;
  const comments = useSelector(selectComments);

  const dispatch = useDispatch();

  const onChangeInput = (text) => setInputComent(text);

  useEffect(() => {
    dispatch(getUpdatedComments(postId));
  }, []);

  const setComment = () => {
    dispatch(updatePost({ inputComent, avatar, userId, postId }));
    setInputComent("");
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
                <TouchableOpacity
                  style={{
                    height: 28,
                    width: 28,
                    borderRadius: 100,
                    borderWidth: 1,
                    marginRight: 16,
                  }}
                  onPress={() => {
                    navigation.navigate("ProfileScreen");
                  }}
                >
                  <Image
                    source={{ uri: item.userAvatar }}
                    style={{ width: 28, height: 28, borderRadius: 100 }}
                  />
                </TouchableOpacity>

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
          marginTop: 6,
          width: "100%",
          position: "absolute",
          bottom: 16,
          marginRight: 16,
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
          onPress={setComment}
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
    marginHorizontal: 16,
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
    right: 24,

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
