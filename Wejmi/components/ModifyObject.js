import { useState, useEffect } from "react";
import {
  TextInput,
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  Text,
} from "react-native";
import { Picker, Form } from "native-base";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { readFile, createFile, arrayOfPlaces, arrayOfStatus } from "./Home";
import Cards from "./Cards";



const storeData = async (object) => {
  return (await AsyncStorage.setItem("@fileURI", JSON.stringify(object)));
};


export default ({ route }) => {
  const objectInformation = route.params.object;
  console.log(objectInformation);

  const [name, setName] = useState("");
  const [places, setPlaces] = useState("");
  const [compartment, setCompartment] = useState("");
  const [furnitureItem, setFurnitureItem] = useState("");
  const [status, setStatus] = useState(arrayOfStatus[0]);
  const [description, setDescription] = useState("");
  const [imageURI, setImageURI] = useState("");
  const [allObjectInformation, setAllObjectInformation] = useState([]);

  const [errorMessage, setErrorMessage] = useState(false);

  const onPlacesChanges = (newPlaces) => {
    setPlaces(newPlaces);
  };
  const onStatusChanges = (newStatus) => {
    setStatus(newStatus);
  };

  const modifyObject = () => {
    const newObject = [
      ...allObjectInformation,
      {
        name: name,
        place: places,
        compartment: compartment,
        furniture: furnitureItem,
        status: status,
        description: description,
        image: imageURI,
      },
    ];
    storeData(newObject);
    //dataFile(newObject);
    setAllObjectInformation(newObject);
    createFile(newObject);
    setName("");
    setPlaces("");
    setCompartment("");
    setFurnitureItem("");
    setStatus(arrayOfStatus[0]), setDescription("");
    setImageURI("");
  };
  useEffect(() => {
    modifyObject(setAllObjectInformation);
  }, []);


  // const Modify = JSON.stringify(modifyObject);

  return (
    <SafeAreaView>
      <View>
        <Cards
          name={objectInformation.name}
          place={objectInformation.place}
          compartment={objectInformation.compartment}
          furnitureItem={objectInformation.furniture}
          status={objectInformation.status}
          description={objectInformation.description}
          image={objectInformation.image}
        ></Cards>
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
            onValueChange={onPlacesChanges.bind(places)}
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
    
      <View style={{ paddingLeft: 10 }}>
        <Form style={{ alignItems: "center" }}>
          <Picker
            note
            mode="dropdown"
            style={{ width: 150 }}
            selectedValue={status}
            onValueChange={onStatusChanges.bind(status)}
          >
            {arrayOfStatus.map((c, index) => (
              <Picker.Item label={c} value={c} key={index} />
            ))}
          </Picker>
        </Form>
      </View>

      <View>
        <TextInput
          style={styles.description}
          placeholder="Description complémentaire sur l'objet (optionnel)"
          onChangeText={(objectDescription) =>
            setDescription(objectDescription)
          }
          value={description}
        />
      </View>


      <View>
        <Button
            title="Modifier l'objet"
            style={styles.buttonHome}
            onPress={() => {
                modifyObject();
                route.navigate("Home");
              }
            }
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
