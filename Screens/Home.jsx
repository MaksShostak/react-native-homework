import { Text, View, StyleSheet } from "react-native";

export const Home = () => {
  return (
    <View style={styles.wrapper}>
      <Text> Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
