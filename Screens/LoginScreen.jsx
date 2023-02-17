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
  const [imputBorderEmail, setImputBorderEmail] = useState(false);
  const [imputBorderPass, setImputBorderPass] = useState(false);
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
    setImputBorderEmail(false);
    setImputBorderPass(false);
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
    dispatch(authLogin(formState));
    setFormState(initialFormState);
    hideKeyboard();
  };

  return (
    <View style={styles.container}>
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
            <Text style={styles.text}>Login</Text>
            <TextInput
              style={{
                ...styles.input,
                borderColor: imputBorderEmail ? "#FF6C00" : "#E8E8E8",
              }}
              placeholder="Email"
              onChangeText={onChangeEmail}
              onFocus={onImputChangeEmail}
              value={formState.email}
            />
            <TextInput
              style={{
                ...styles.input,
                borderColor: imputBorderPass ? "#FF6C00" : "#E8E8E8",
              }}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={onChangePass}
              onFocus={onImputChangePass}
              value={formState.password}
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
                Login
              </Text>
            </TouchableOpacity>
            <Text style={styles.underButtText}>
              Don't have an account?{" "}
              <Text onPress={() => navigation.navigate("Register")}>
                Register
              </Text>
            </Text>
          </View>
          {/* </KeyboardAvoidingView> */}
        </TouchableWithoutFeedback>
      </Background>
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
});
