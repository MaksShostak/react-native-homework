import { Text, View, StyleSheet } from "react-native";

export const ProfileScreen = () => {
  return (
    <View style={styles.wrapper}>
      <Text> ProfileScreen</Text>
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
