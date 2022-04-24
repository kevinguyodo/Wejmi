import { useState } from "react";
import {
  TextInput,
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  Text,
} from "react-native";
import { Picker, Form } from "native-base";
import { createFile, openCamera, arrayOfPlaces, arrayOfStatus } from "./Home";

export default ({ route, navigation }) => {
  const objectInformation = route.params.object;
  const [newName, setNewName] = useState(objectInformation.name);
  const [newPlaces, setNewPlaces] = useState(objectInformation.place);
  const [newCompartment, setNewCompartment] = useState(
    objectInformation.compartment
  );
  const [newFurnitureItem, setNewFurnitureItem] = useState(
    objectInformation.furniture
  );
  const [newStatus, setNewStatus] = useState(objectInformation.status);
  const [newDescription, setNewDescription] = useState(
    objectInformation.description
  );
  const [newImageURI, setNewImageURI] = useState(objectInformation.image);
  const [newObjectInformation, setNewObjectInformation] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);

  const onPlacesChanges = (newPlaces) => {
    setNewPlaces(newPlaces);
  };
  const onStatusChanges = (newStatus) => {
    setNewStatus(newStatus);
  };

  // --------------- Add object in JSON file ------------------------------
  const addNewObject = () => {
    const newObject = [
      ...newObjectInformation,
      {
        name: newName,
        place: newPlaces,
        compartment: newCompartment,
        furniture: newFurnitureItem,
        status: newStatus,
        description: newDescription,
        image: newImageURI,
      },
    ];
    setNewObjectInformation(newObject);
    // createFile(newObject);
    setNewName("");
    setNewPlaces("");
    setNewCompartment("");
    setNewFurnitureItem("");
    setNewStatus(arrayOfStatus[0]), setNewDescription("");
    setNewImageURI("");
  };
  return (
    <SafeAreaView>
      <View>
        <Text
          style={
            objectInformation.image != newImageURI
              ? { color: "grey" }
              : { color: "#ecf0f1" }
          }
        >
          Nouvelle photo capturé
        </Text>
        <Button
          title="Prendre une photo"
          onPress={() => {
            openCamera(setNewImageURI);
          }}
        />
      </View>
      <TextInput
        style={styles.paragraph}
        placeholder={newName}
        value={newName}
        onChangeText={(name) => setNewName(name)}
      />
      <View style={{ paddingLeft: 10 }}>
        <Form style={{ alignItems: "center" }}>
          <Picker
            note
            mode="dropdown"
            style={{ width: 150 }}
            selectedValue={newPlaces}
            onValueChange={onPlacesChanges.bind(newPlaces)}
          >
            <Picker.Item
              label={objectInformation.place}
              value={objectInformation.place}
            />
            {arrayOfPlaces.map((c, index) => (
              <Picker.Item label={c} value={c} key={index} />
            ))}
          </Picker>
        </Form>
      </View>
      <View>
        <TextInput
          style={styles.compartment}
          placeholder="{objectInformation.compartment}"
          value={newCompartment}
          onChangeText={(objectCompartment) =>
            setNewCompartment(objectCompartment)
          }
        />
      </View>
      <View>
        <TextInput
          style={styles.compartment}
          placeholder={newFurnitureItem}
          value={newFurnitureItem}
          onChangeText={(objectFurnitureItem) =>
            setNewFurnitureItem(objectFurnitureItem)
          }
        />
      </View>
      <View style={{ paddingLeft: 10 }}>
        <Form style={{ alignItems: "center" }}>
          <Picker
            note
            mode="dropdown"
            style={{ width: 150 }}
            selectedValue={newStatus}
            onValueChange={onStatusChanges.bind(newStatus)}
          >
            {arrayOfStatus.map((c, index) => (
              <Picker.Item label={c} value={c} key={index} />
            ))}
          </Picker>
        </Form>
      </View>
      <View>
        <TextInput
          style={styles.compartment}
          placeholder="{objectInformation.description}"
          onChangeText={(objectDescription) =>
            setNewDescription(objectDescription)
          }
          value={newDescription}
        />
      </View>
      <View>
        <Button
          title="Créer l'objet"
          style={styles.buttonHome}
          onPress={() => {
            if (
              newName.length != 0 &&
              newFurnitureItem.length != 0 &&
              newPlaces != "Lieux"
            ) {
              addNewObject();
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
