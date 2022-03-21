import { Text, View, Button, StyleSheet } from "react-native";

const viewObjectDetails = () => {
  navigation;
};

export default ({ navigation }) => {
  const viewDetails = () => {
    navigation.navigate("Details");
    console.log("Click");
  };

  return (
    <View style={styles.containerHome}>
      <Text style={styles.home}>Home</Text>
      <Button style={styles.buttonHome} title="home" onPress={viewDetails}>
        Go to home
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  containerHome: {
    alignItems: "center",
  },
  home: {
    backgroundColor: "black",
    color: "white",
  },
  buttonHome: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});
