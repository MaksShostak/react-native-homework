import { Text, View, StyleSheet } from "react-native";

export const CreatePostsScreen = () => {
  return (
    <View style={styles.wrapper}>
      <Text> CreatePostsScreen </Text>
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
