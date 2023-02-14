import { useState, useEffect } from "react";
import { authLogin } from "../reduxToolkit/auth/operations-auth";
import { useDispatch } from "react-redux";
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
} from "react-native";

import { Background } from "../components/Background";
const BackgroundImg = require("../assets/images/Photo.jpg");

const initialFormState = {
  email: "",
  password: "",
};

export const Login = ({ navigation }) => {
  const [formState, setFormState] = useState(initialFormState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const dispatch = useDispatch();

  const onChangeEmail = (text) => {
    setFormState((prevformState) => ({
      ...prevformState,
      email: text,
    }));
  };
  const onChangePass = (text) => {
    setFormState((prevformState) => ({
      ...prevformState,
      password: text,
    }));
  };
  const hideKeyboard = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };
  const showKeyboard = () => {
    setIsShowKeyboard(true);
  };
  const onSubmit = () => {
    dispatch(authLogin(formState));
    setFormState(initialFormState);
    hideKeyboard();
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={hideKeyboard}>
        <Background img={BackgroundImg} styleBtn={styles.background}>
          {/* <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          > */}
          <View
            style={{
              ...styles.form,
              marginBottom: isShowKeyboard ? 0 : 0,
            }}
          >
            <Text style={styles.text}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={onChangeEmail}
              onFocus={showKeyboard}
              value={formState.email}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={onChangePass}
              onFocus={showKeyboard}
              value={formState.password}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={onSubmit}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.underButtText}>
              Don't have an account?{" "}
              <Text onPress={() => navigation.navigate("Register")}>
                Register
              </Text>
            </Text>
          </View>
          {/* </KeyboardAvoidingView> */}
        </Background>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    borderColor: "#E8E8E8",
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
    marginTop: 32,
    marginBottom: 16,
    fontSize: 30,
    fontFamily: "Pacifico_400Regular",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginHorizontal: 16,
    marginTop: 43,
  },
  buttonText: {
    paddingTop: 16,
    paddingBottom: 16,
    color: "#FFFFFF",
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
});
