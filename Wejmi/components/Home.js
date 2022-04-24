import { View, Button, StyleSheet, TextInput, ScrollView } from "react-native";
import { Form, Picker } from "native-base";
import { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import Cards from "./Cards";

const fileURI = FileSystem.documentDirectory + "Wejmi.json";
const fileExists = async (uri) => {
  return (await FileSystem.getInfoAsync(uri)).exists;
};
export const createFile = async (object) => {
  await FileSystem.writeAsStringAsync(fileURI, JSON.stringify(object));
};

export const readFile = async (setObject) => {
  if (await fileExists(fileURI)) {
    const content = await FileSystem.readAsStringAsync(fileURI);
    const contentParse = JSON.parse(content);
    // --------------- Automatically sorts in alphabetical order -------------------------------
    contentParse.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
    setObject(contentParse);
  }
};


export const arrayOfPlaces = [
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

export const arrayOfStatus = ["A sa place", "Déplacé temporairement", "Perdu"];

// --------------- Copy picture in document folder ------------------------------
export const copyFile = async (image) => {
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

// --------------- Use camera to take a picture ------------------------------
export const openCamera = async (setImageURI) => {
  let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("Permission to access camera roll is required!");
    return;
  }

  let pickerResult = await ImagePicker.launchCameraAsync();

  let URIChanged = await copyFile(pickerResult);
  setImageURI(URIChanged);
};
export default ({ navigation }) => {
  const [objects, setObject] = useState([]);
  const [filterElement, setFilterElement] = useState("");
  const [statusFilter, setStatusFiltrer] = useState("");
  const removeAllObject = () => {
    const newObject = objects.filter((object) => !object.name.length == 0);
    setObject(newObject);
    createFile(newObject);

  };

  const removeOneObject = (obj) => {
    const allObject = setObject((objects) =>
      objects.filter((i) => i.name !== obj)
    );
    createFile(allObject);
  };

  const modifyObject = (object) => {
    navigation.navigate("Modify", {
      object,
      objectChange: (newObject) => {
        object.name = newObject.name;
        object.place = newObject.place;
        object.compartment = newObject.compartment;
        object.furniture = newObject.furniture;
        object.status = newObject.status;
        object.description = newObject.description;
        object.image = newObject.image;
        let test = setObject([...objects]);
        createFile(test);
      },
    });
  };

  // Affichage conditionnel
  const displayCard = (object, index) => {
    const objectElementArray = [
      object.name,
      object.place,
      object.compartment,
      object.furniture,
      object.description,
    ];
    const card = (
      <Cards
        id={object.id}
        name={object.name}
        place={object.place}
        compartment={object.compartment}
        furnitureItem={object.furniture}
        status={object.status}
        description={object.description}
        image={object.image}
        modifyObject={() => {
          modifyObject(object);
        }}
        removeObject={() => {
          removeOneObject(object.name);
        }}
        key={index}
      />
    );
    if (filterElement.length == 0 && statusFilter.length == 0) {
      return card;
    } else {
      if (filterElement.length != 0 && statusFilter.length == 0) {
        for (let index = 0; index <= objectElementArray.length; index++) {
          if (filterElement == objectElementArray[index]) {
            return card;
          }
        }
      } else if (filterElement.length == 0 && statusFilter.length != 0) {
        if (statusFilter == object.status) {
          return card;
        }
      } else {
        for (let index = 0; index <= objectElementArray.length; index++) {
          if (
            filterElement == objectElementArray[index] &&
            statusFilter == object.status
          ) {
            return card;
          }
        }
      }
    }
  };

  const changeFilterStatus = (newStatus) => {
    setStatusFiltrer(newStatus);
  };

  useEffect(() => {
    readFile(setObject);
  }, []);

  return (
    <ScrollView>
      <View style={{marginTop:20, marginLeft:20, marginRight:20}} >
        <Button
          title="Enregistrer un objet"
          onPress={() => {
            navigation.navigate("Create");
          }}
          color="#616161"
        ></Button>
        <Button
          title="Acualiser"
          color="#616161"
          onPress={() => {
            readFile(setObject);
          }}
        />
      </View>
      

      <View style={styles.inputTxt}>
        <TextInput
          style={{ height: 40, paddingLeft: 10 }}
          placeholder="Trouve ton objet ..."
          onChangeText={(newfilter) => setFilterElement(newfilter)}
        />
        <Form style={{ alignItems: "center" }}>
          <Picker
            note
            mode="dropdown"
            style={{ width: 150 }}
            selectedValue={statusFilter}
            onValueChange={changeFilterStatus.bind(statusFilter)}
          >
            <Picker.Item label="Choisir un marqueur d'objet" value="" />
            {arrayOfStatus.map((c, index) => (
              <Picker.Item label={c} value={c} key={index} />
            ))}
          </Picker>
        </Form>
      </View>
      <View style={{ paddingTop: 20,marginLeft:20, marginRight:20 }}>
        <Button
           color="#616161"
          onPress={() => {
            removeAllObject();
          }}
          title="Supprimer tous les objets"
        ></Button>
      </View>
      {objects.map((object, index) => displayCard(object, index))}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  containHeader: {
    marginRight: 100,
    marginLeft: 100,
    marginTop: 20,
    paddingBottom: 10,
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
