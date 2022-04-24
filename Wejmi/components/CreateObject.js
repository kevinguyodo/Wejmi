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
import {
  readFile,
  openCamera,
  createFile,
  arrayOfPlaces,
  arrayOfStatus,
} from "./Home";

export default ({ navigation }) => {
  // --------------- Creation of all Hooks ------------------------------
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

  // --------------- Add object in JSON file ------------------------------
  const addObject = () => {
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

    setAllObjectInformation(newObject);
    createFile(newObject);
    setName("");
    setPlaces("");
    setCompartment("");
    setFurnitureItem("");
    setStatus(arrayOfStatus[0]), setDescription("");
    setImageURI("");
  };

  // --------------- Allows to add and not replace an object in the JSON --------------------
  useEffect(() => {
    readFile(setAllObjectInformation);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text
          style={
            imageURI.length != 0 ? { color: "grey" } : { color: "#ecf0f1" }
          }
        >
          Photo capturé
        </Text>
        <Button
          color="#616161"
          title="Prendre une photo"
          onPress={() => {
            openCamera(setImageURI);
          }}
        />
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
          color="#616161"
          title="Créer l'objet"
          style={styles.buttonHome}
          onPress={() => {
            if (
              name.length != 0 &&
              furnitureItem.length != 0 &&
              places != "Lieux"
            ) {
              addObject();
              navigation.navigate("Home");
            } else {
              setErrorMessage(true);
            }
          }}
        />
        <Text style={errorMessage ? { color: "red" } : { color: "#ecf0f1" }}>
          Veuillez vérifier si les champs 'Nom de l'objet', 'Lieux' et 'Meuble'
          est bien rempli ou correct
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "#212121",
    marginTop: 100,
    justifyContent: "center",
    padding: 50,
    backgroundColor: "#ecf0f1",
    marginLeft: 20,
    marginRight: 20,
  },
  buttonHome: {},
  paragraph: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
    backgroundColor: "#FAF9F6",
  },
  card: {
    width: 344,
  },
  description: {
    paddingTop: 10,
    marginTop: 10,
    backgroundColor: "#FAF9F6",
    textAlign: "center",
    fontWeight: "bold",
  },
  compartment: {
    textAlign: "center",
    fontWeight: "bold",
    paddingBottom: 10,
    backgroundColor: "#FAF9F6",
  },
  card: {
    backgroundColor: "#9E9E9E",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
});
