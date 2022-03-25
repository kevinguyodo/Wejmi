import { Text, View, Button, StyleSheet } from "react-native";

export default ({ navigation }) => {
  const viewDetails = () => {
    navigation.navigate("Create");
  };

  const viewModify = () => {
    navigation.navigate("Modify");
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
        <Button style={styles.buttonHomes} title="Modify" onPress={viewModify}>
          Go to Modify
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
  buttonHomes: {
    paddingTop: 20,
    paddingBottom: 20,
  },
});
