import {
  View,
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Form, Picker } from "native-base";
import { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
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
    console.log(contentParse);
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
export default ({ navigation }) => {
  const [objects, setObject] = useState([]);
  const [filterElement, setFilterElement] = useState("");
  const [statusFilter, setStatusFiltrer] = useState("");

  const removeAllObject = () => {
    const newObject = objects.filter((object) => !object.name.length == 0);
    setObject(newObject);
    createFile(newObject);

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
        setObject([...objects]);
        createFile(objects);
      },
    });
  };

  // Affichage conditionnel
  const displayCard = (object, index) => {
    let filter = [];
    const objectElementArray = [
      object.name,
      object.place,
      object.compartment,
      object.furniture,
      // object.status,
      object.description,
    ];
    const card = (
      <Cards
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
    // return card;
    // if (filterElement.length == 0 && statusFilter.length == 0) {
    //   return card;
    // } else {
    //   for (
    //     let indexArray = 0;
    //     indexArray <= objectElementArray.length;
    //     indexArray++
    //   ) {
    //     if (objectElementArray[indexArray] == filterElement) {
    //       filter.push(objectElementArray[indexArray]);
    //     }
    //     if (objectElementArray[index] == statusFilter) {
    //       filter.push(objectElementArray[indexArray]);
    //     }
    //   }
    //   console.log(filter);
    //   for (let indextest = 0; indextest <= filter.length; indextest++) {
    //     console.log(filter);
    //     // if (filter[indextest] == object.status) {
    //     //   return card;
    //     // }
    //   }
    // }
  };

  const changeFilterStatus = (newStatus) => {
    setStatusFiltrer(newStatus);
  };

  useEffect(() => {
    readFile(setObject);
  }, []);

  return (
    <ScrollView>
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
          title="Refresh"
          color="black"
          onPress={() => {
            readFile(setObject);
          }}
        />
      </View>

      <View style={styles.inputTxt}>
        <TextInput
          style={{ height: 40, paddingLeft: 10 }}
          placeholder="Trouve ton objet Marmoud ..."
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
        {/* <Button onPress={displayCard} /> */}
      </View>
      <View style={{ paddingTop: 10 }}>
        <Button
          onPress={() => {
            removeAllObject();
          }}
          title="Supprimer tout les objets"
        ></Button>
      </View>
      {/* <ScrollView style={styles.containerHome}> */}
      {objects.map((object, index) => displayCard(object, index))}
      {/* </ScrollView> */}
    </ScrollView>
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
});
