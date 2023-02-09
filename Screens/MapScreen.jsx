import { Text, View, StyleSheet } from "react-native";

export const MapScreen = () => {
  return (
    <View style={styles.wrapper}>
      <Text> MapScreen</Text>
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
