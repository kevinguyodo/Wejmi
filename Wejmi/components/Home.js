import { Image,Text, View, Button, StyleSheet } from "react-native";
import logo from '../assets/logo.png'; 

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
     <Image source={logo} style={{ width: 305, height: 159 }} /> 
      <Text style={styles.home}>Bienvenue sur l'app de RANGEMENT</Text>
      <Button style={styles.buttonHome} title="Accéder a la bibliotheque" onPress={viewDetails}>
      </Button>
    </View>
  );
};



const styles = StyleSheet.create({
  containerHome: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: "center",
    justifyContent: "center",
  },
  home: {
    marginTop:10,
    backgroundColor: "black",
    color: "white",
  },
  buttonHome: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});