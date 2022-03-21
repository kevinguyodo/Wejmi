import { Text, View, Button, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";

export default ({ navigation }) => {
  const viewDetails = () => {
    navigation.navigate("Create");
  };
  const ViewCreate = () => {
    navigation.navigate("Create");
    console.log("create Page");
  };

  return (
    <View>
      <View style={styles.containHeader}>
        <Text> WEJMI</Text>

        <Button
          style={styles.header}
          title="Create Card"
          onPress={ViewCreate}
        ></Button>
        <TextInput></TextInput>
      </View>

      <View style={styles.containerHome}>
        {/*         
        <Button style={styles.buttonHome} title="home" onPress={viewDetails}>
          Go to home
        </Button> */}
         <TouchableOpacity onPress={() => Alert.alert('image clicked')}>
        <Image
          source={{
            uri:
              'https://cdn.pixabay.com/photo/2020/05/04/23/06/spring-5131048_960_720.jpg',
          }}
          style={styles.image}
        />
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    //paddingTop: 15,
  },
  containerHome: {
    alignItems: "center",
    marginTop: 16,
  },
  home: {
    backgroundColor: "black",
    color: "white",
  },
  buttonHome: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  containHeader: {
    marginRight: 250,
    marginTop: 45,
  },
});
