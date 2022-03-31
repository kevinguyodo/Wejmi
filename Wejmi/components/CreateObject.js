import React, { useState, useEffect } from "react";
import {
  TextInput,
  SafeAreaView,
  StyleSheet,
  View,
  Button,
} from "react-native";
import { Picker,Text, Form } from "native-base";
import * as FileSystem from 'expo-file-system';
//import {Picker} from '@react-native-picker/picker';
const fileURI = FileSystem.documentDirectory + "Wejmi.json";

// Create and write in json
const createFile = async (object) => {
  await FileSystem.writeAsStringAsync(fileURI, JSON.stringify(object));
};

// uri can be different JSON file
const fileExists = async (uri) => {
  return (await FileSystem.getInfoAsync(uri)).exists;
};

export default ({ navigation }) => {
  const readFile = async () => {
    if (await fileExists(fileURI)) {
      const content = await FileSystem.readAsStringAsync(fileURI);
      setAllObjectInformation(JSON.parse(content));
    }
  };
  useEffect(() => {
    readFile();
  }, []);

  const arrayOfPlaces = [
    "Salon",
    "Salle à manger",
    "Cuisine",
    "Chambre",
    "Salle de bain",
    "Toilettes",
    "Bureau",
    "Veranda",
    "Garage",
  ];
  const [name, setName] = useState("");
  const [places, setPlaces] = useState("");
  const [compartment, setCompartment] = useState("");
  const [furnitureItem, setFurnitureItem] = useState("");
  const [description, setDescription] = useState("");

  const [allObjectInformation, setAllObjectInformation] = useState([]);

  const onValueChanges = (value) => {
    setPlaces(value);
  };
  const addObject = () => {
    const newObject = [
      ...allObjectInformation,
      {
        name: name,
        place: places,
        compartment: compartment,
        furniture: furnitureItem,
        description: description,
      },
    ];
    setAllObjectInformation(newObject);
    createFile(newObject);
    setName("");
    setPlaces("");
    setCompartment("");
    setFurnitureItem("");
    setDescription("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.paragraph}>circle picture</Text>
      </View>
      <View>
        <TextInput
          style={styles.paragraph}
          placeholder="Nom de l'objet"
          value={name}
          onChangeText={(newName) => setName(newName)}
        />
      </View>
      <View style={{ paddingLeft: 10 }}>
        <Form style={{ alignItems: "center" }}>
          <Picker
            note
            mode="dropdown"
            style={{ width: 150 }}
            selectedValue={places}
            onValueChange={onValueChanges.bind(places)}
          >
            <Picker.Item label="Lieux" value="Lieux" />
            {arrayOfPlaces.map((c, index) => (
              <Picker.Item label={c} value={c} key={index} />
            ))}
          </Picker>
        </Form>
      </View>

      <View>
        <TextInput
          style={styles.compartment}
          placeholder="Compartiment (optionnel)"
          value={compartment}
          onChangeText={(objectCompartment) =>
            setCompartment(objectCompartment)
          }
        />
      </View>
      <View>
        <TextInput
          style={styles.compartment}
          placeholder="Meuble"
          value={furnitureItem}
          onChangeText={(objectFurnitureItem) =>
            setFurnitureItem(objectFurnitureItem)
          }
        />
      </View>
      <View>
        <TextInput
          style={styles.description}
          placeholder="Description complémentaire sur l'objet"
          onChangeText={(objectDescription) =>
            setDescription(objectDescription)
          }
          value={description}
        />
      </View>
      <View>
        <Button
          title="Créer l'objet"
          style={styles.buttonHome}
          onPress={() => {
            addObject();
            navigation.navigate("Home");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#ecf0f1",
  },
  paragraph: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
  card: {
    width: 344,
  },
  description: {
    marginLeft: 10,
    height: 50,
  },
  compartment: {
    textAlign: "center",
    fontWeight: "bold",
    paddingBottom: 10,
    paddingTop: 10,
  },
});

// export default () => {

//   return (
//     <View >
//       <Text>Cards</Text>
//     </View>
//   );
// };
