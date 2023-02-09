import { View, Text, StyleSheet } from "react-native";

export const CommentsScreen = () => {
  return (
    <View style={styles.wrapper}>
      <Text> CommentsScreen</Text>
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
