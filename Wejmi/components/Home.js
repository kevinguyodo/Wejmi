import { Text, View, StyleSheet } from "react-native";

export default () => {
  return (
    <View>
      <Text style={styles.home}>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    backgroundColor: "black",
    color: "white",
  },
});
