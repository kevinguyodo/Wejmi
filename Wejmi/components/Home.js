import {
  View,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import CreateObject from "./CreateObject";
import { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import Cards from "./Cards";

const fileURI = FileSystem.documentDirectory + "Wejmi.json";
const fileExists = async (uri) => {
  return (await FileSystem.getInfoAsync(uri)).exists;
};

export default ({ navigation }) => {
  const [objects, setObject] = useState([]);
  const readFile = async () => {
    if (await fileExists(fileURI)) {
      const content = await FileSystem.readAsStringAsync(fileURI);
      setObject(JSON.parse(content));
      console.log(JSON.parse(content));
    }
  };

  useEffect(() => {
    readFile();
  }, []);
  return (
    <View>
      {/* -------------------------------------------------------------------------------- */}
      <View style={styles.containHeader}>
        <Button
          style={styles.header}
          title="Create Card"
          onPress={() => {
            navigation.navigate("Create");
          }}
          color="#616161"
        ></Button>
        <Button
          title="Information JSON"
          color="black"
          onPress={() => {
            readFile();
            // console.log(
            //   objects.map((c) => {
            //     return c;
            //   })
            // );
            // test();
          }}
        />
      </View>
      {/* -------------------------------------------------------------------------------- */}

      <View style={styles.inputTxt}>
        <TextInput
          style={{ height: 40, paddingLeft: 10 }}
          placeholder="Trouve ton objet Marmoud ..."
        />
      </View>
      {/* -------------------------------------------------------------------------------- */}

      <ScrollView style={styles.containerHome}>
        {objects.map((c, index) => (
          <Cards
            name={c.name}
            place={c.place}
            compartment={c.compartment}
            furnitureItem={c.furniture}
            description={c.description}
            key={index}
          />
        ))}
      </ScrollView>
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
    borderColor: "#212121",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  containHome: {
    flex: 1,
    justifyContent: "center",
    padding: 90,
    backgroundColor: "#616161",
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
  },
  buttonHomes: {
    paddingTop: 20,
    paddingBottom: 20,
  },
});
