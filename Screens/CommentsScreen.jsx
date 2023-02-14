import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

export const CommentsScreen = ({ route }) => {
  const [coments, setComents] = useState([]);
  const [inputComent, setInputComent] = useState("");
  // const onChangeInput = (text) => {
  //   setInputComent((prevState) => ({
  //     ...prevState,
  //     text,
  //   }));
  // };
  const onChangeInput = (text) => setInputComent(text);
  const onSubmit = () => {
    setInputComent(inputComent);
    setComents((prevState) => [...prevState, inputComent]);
    setInputComent("");
  };

  useEffect(() => {
    if (route.params) {
      setComents((prevState) => [...prevState, inputComent]);
    }
  }, [route.params]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Image
          source={{ uri: route.params.photoURL }}
          style={{
            height: 240,
            marginTop: 32,
            borderRadius: 8,
            marginHorizontal: 16,
          }}
        />
        <View
          style={{
            marginTop: 32,
            marginHorizontal: 16,
          }}
        >
          <View style={styles.commentContainer}>
            <Image
              sourse={{ uri: route.params.photoURL }}
              style={{
                height: 28,
                width: 28,
                borderRadius: 100,
                backgroundColor: "green",
                marginRight: 16,
              }}
            />

            <Text style={{ paddingRight: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque,
              repudiandae ex, eum labore architecto itaque voluptates vitae
              minima quae fugiat nesciunt ad quos possimus culpa mollitia
              aperiam perferendis? Minima, minus. {inputComent}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ position: "relative", marginHorizontal: 16 }}>
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
          onPress={onSubmit}
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
    paddingRight: 24,
  },
});
