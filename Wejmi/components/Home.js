import { Text, View, Button, StyleSheet } from "react-native";

const viewObjectDetails = () => {
  navigation;
};

export default ({ navigation }) => {
  const viewDetails = () => {
    navigation.navigate("Details");
    console.log("Click");
  
  };
  const ViewCreate = () => {
    navigation.navigate("Create");
    console.log('create Page')
  }

  return (
    <View style={styles.containerHome}>
      <Button style={styles.buttonHome} title="home" onPress={viewDetails}>
        Go to home
      </Button>
      <Button style={styles.buttonHome} title="Create" onPress={ViewCreate}>
        Modify</Button>
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
