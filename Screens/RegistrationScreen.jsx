import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export const Registration = ({ hideKeyboard, showKeyboard, navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nameHandler = (text) => setName(text);
  const emaildHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const onSubmit = () => {
    console.log(name, email);
    setName("");
    setEmail("");
    setPassword("");
    hideKeyboard();
  };

  return (
    // <View style={styles.wrapper}>
    <View style={styles.form}>
      <Text style={styles.text}>Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={name}
        onChangeText={nameHandler}
        onFocus={showKeyboard}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={emaildHandler}
        onFocus={showKeyboard}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={passwordHandler}
        onFocus={showKeyboard}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={onSubmit}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.underButtText}>
        Already have an account?{" "}
        <Text onPress={() => navigation.navigate("Login")}>Login</Text>
      </Text>
    </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  // wrapper: { flex: 1, justifyContent: "flex-end", backgroundColor: "red" },
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
    marginTop: 92,
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
