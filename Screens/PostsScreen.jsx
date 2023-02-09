import { Text, View, StyleSheet } from "react-native";

export const PostsScreen = () => {
  return (
    <View style={styles.wrapper}>
      <Text> PostsScreen</Text>
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
