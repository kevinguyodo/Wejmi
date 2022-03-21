import { Text, View, Button, StyleSheet } from "react-native";

export default ({ navigation }) => {
  const viewDetails = () => {
    navigation.navigate("Create");
  };

  return (
    <View>
      <View>
        <Text style={styles.header}>Ma bibliothèque</Text>
      </View>

      <View style={styles.containerHome}>
        <Text style={styles.home}>Home</Text>
        <Button style={styles.buttonHome} title="home" onPress={viewDetails}>
          Go to home
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    // paddingTop: 15,
    paddingBottom: 20,
  },
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
