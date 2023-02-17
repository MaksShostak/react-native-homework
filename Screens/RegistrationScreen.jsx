import { useState, useEffect } from "react";
import { authRegister } from "../reduxToolkit/auth/operations-auth";
import { useDispatch } from "react-redux";
import { EvilIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Button,
  Image,
} from "react-native";

import { Background } from "../components/Background";

const BackgroundImg = require("../assets/images/Photo.jpg");

export const Registration = ({ navigation }) => {
  const [imputBorderName, setImputBorderName] = useState(false);
  const [imputBorderEmail, setImputBorderEmail] = useState(false);
  const [imputBorderPass, setImputBorderPass] = useState(false);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  const dispatch = useDispatch();

  const nameHandler = (text) => {
    setName(text);
  };
  const emaildHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
    setImputBorderName(false);
    setImputBorderEmail(false);
    setImputBorderPass(false);
  };

  const onImputChangeName = () => {
    setIsShowKeyboard(true);
    setImputBorderName(true);
  };
  const onImputChangeEmail = () => {
    setIsShowKeyboard(true);
    setImputBorderEmail(true);
  };
  const onImputChangePass = () => {
    setIsShowKeyboard(true);
    setImputBorderPass(true);
  };

  const onSubmit = () => {
    dispatch(authRegister({ name, email, password, avatar }));

    setName("");
    setEmail("");
    setPassword("");
    hideKeyboard();
    setAvatar(null);
  };

  return (
    <View style={styles.wrapper}>
      <Background img={BackgroundImg} styleBtn={styles.background}>
        {/* <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          > */}
        <TouchableWithoutFeedback onPress={hideKeyboard}>
          <View
            style={{
              ...styles.form,
              marginBottom: isShowKeyboard ? 0 : 0,
            }}
          >
            <View style={styles.avatarContainer}>
              <TouchableOpacity
                onPress={pickImage}
                style={styles.addAvatarButton}
              >
                <EvilIcons name="plus" size={24} color="#FF6C00" />
              </TouchableOpacity>
              {avatar && (
                <Image
                  source={{ uri: avatar }}
                  style={{ width: 120, height: 120, borderRadius: 16 }}
                />
              )}
            </View>
            <Text style={styles.text}>Registration</Text>
            <TextInput
              style={{
                ...styles.input,
                borderColor: imputBorderName ? "#FF6C00" : "#E8E8E8",
              }}
              placeholder="Username"
              value={name}
              onChangeText={nameHandler}
              onFocus={onImputChangeName}
            />
            <TextInput
              style={{
                ...styles.input,
                borderColor: imputBorderEmail ? "#FF6C00" : "#E8E8E8",
              }}
              placeholder="Email"
              value={email}
              onChangeText={emaildHandler}
              onFocus={onImputChangeEmail}
            />
            <TextInput
              style={{
                ...styles.input,
                borderColor: imputBorderPass ? "#FF6C00" : "#E8E8E8",
              }}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={passwordHandler}
              onFocus={onImputChangePass}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                ...styles.button,
                backgroundColor: isShowKeyboard ? "#FF6C00" : "#F6F6F6",
              }}
              onPress={onSubmit}
            >
              <Text
                style={{
                  ...styles.buttonText,
                  color: isShowKeyboard ? "#FFFFFF" : "#BDBDBD",
                }}
              >
                Register
              </Text>
            </TouchableOpacity>
            <Text style={styles.underButtText}>
              Already have an account?{" "}
              <Text onPress={() => navigation.navigate("Login")}>Login</Text>
            </Text>
          </View>
          {/* </KeyboardAvoidingView> */}
        </TouchableWithoutFeedback>
      </Background>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
  form: {
    backgroundColor: "#fff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  input: {
    borderWidth: 1,

    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    height: 50,
    marginTop: 16,
    marginHorizontal: 16,
    paddingLeft: 16,
    fontSize: 16,
    color: "#212121",
    fontFamily: "Roboto_400Regular",
  },
  text: {
    marginTop: 92,
    marginBottom: 16,
    fontSize: 30,
    fontFamily: "Pacifico_400Regular",
    textAlign: "center",
  },
  button: {
    borderRadius: 100,
    marginHorizontal: 16,
    marginTop: 43,
  },
  buttonText: {
    paddingTop: 16,
    paddingBottom: 16,

    fontSize: 16,
    textAlign: "center",
  },
  underButtText: {
    marginTop: 16,
    marginBottom: 78,
    color: "#1B4371",
    fontSize: 16,
    textAlign: "center",
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 16,
    alignSelf: "center",

    backgroundColor: "#F6F6F6",
    position: "absolute",
    top: -60,
  },
  addAvatarButton: {
    width: 25,
    height: 25,
    borderRadius: 100,
    position: "absolute",
    left: 107.5,
    top: 87.5,
    zIndex: 1,
  },
});
