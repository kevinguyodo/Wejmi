import {
  Text,
  View,
  Button,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Card } from 'react-native-paper';


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
{/* -------------------------------------------------------------------------------- */}
      <View style={styles.containHeader}>
        <Button 
          style={styles.header}
          title="Create Card"
          onPress={ViewCreate}
          color='#616161'>
        </Button>        
      </View>
{/* -------------------------------------------------------------------------------- */}

      <View style={styles.inputTxt}>
      <TextInput
        style={{height: 40, paddingLeft:10}}
        
        placeholder="   Trouve ton objet Marmoud ..."/>
      </View>
{/* -------------------------------------------------------------------------------- */}

      <View style={styles.containerHome}>

      <Card>
         
        </Card>
      </View>
{/* -------------------------------------------------------------------------------- */}

    </View>
  );
};



const styles = StyleSheet.create({
  
  containHeader: {
    marginRight: 200,
    marginLeft: 10,
    marginTop: 20,

  },

  inputTxt: {
    borderWidth: 2,
    borderColor: "#9E9E9E",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  containerHome: {
    flex: 1,
    justifyContent: 'center',
    padding: 90,
    backgroundColor: '#616161',
    marginTop: 50,
    marginLeft:20,
    marginRight:20,
  },
});
