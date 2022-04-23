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

const storeData = async (object) => {
  return (await AsyncStorage.setItem("@fileURI", JSON.stringify(object)));
};

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

  // --------------- Use camera to take a picture ------------------------------
  const openCamera = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync();

    let URIChanged = await copyFile(pickerResult);
    console.log(URIChanged);
    setImageURI(URIChanged);
  };

  // --------------- Copy picture in document folder ------------------------------
  const copyFile = async (image) => {
    let fileName = image.uri.substring(
      image.uri.lastIndexOf("/") + 1,
      image.uri.length
    );
    const uri = `${FileSystem.documentDirectory}${fileName}`;

    await FileSystem.copyAsync({
      from: image.uri,
      to: uri,
    });
    return uri;
  };

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
        <Button title="Prendre une photo" onPress={openCamera} />
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
      {/* Placer le status de l'objet  */}

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
