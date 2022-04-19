import { View, Button, StyleSheet, TextInput, ScrollView } from "react-native";
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
  }
};
export default ({ navigation }) => {
  const [objects, setObject] = useState([]);
  const [filterElement, setFilterElement] = useState("");

  const removeAllObject = () => {
    const newObject = objects.filter((object) => !object.name.length != 0);
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
        object.description = newObject.description;
        object.image = newObject.image;
        setObject([...objects]);
        createFile(objects);
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
        name={object.name}
        place={object.place}
        compartment={object.compartment}
        furnitureItem={object.furniture}
        description={object.description}
        image={object.image}
        modifyObject={() => {
          modifyObject(object);
        }}
        key={index}
      />
    );
    if (filterElement.length == 0) {
      return card;
    } else {
      for (
        let indexArray = 0;
        indexArray <= objectElementArray.length;
        indexArray++
      ) {
        if (objectElementArray[indexArray] === filterElement) {
          return card;
        }
      }
    }
  };

  useEffect(() => {
    readFile(setObject);
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
          title="Refresh"
          color="black"
          onPress={() => {
            readFile(setObject);
          }}
        />
      </View>
      {/* -------------------------------------------------------------------------------- */}

      <View style={styles.inputTxt}>
        <TextInput
          style={{ height: 40, paddingLeft: 10 }}
          placeholder="Trouve ton objet Marmoud ..."
          onChangeText={(newfilter) => setFilterElement(newfilter)}
        />
      </View>
      <View style={{ paddingTop: 10 }}>
        <Button
          onPress={() => {
            removeAllObject();
          }}
          title="Supprimer tout les objets"
        ></Button>
      </View>

      {/* -------------------------------------------------------------------------------- */}

      <ScrollView style={styles.containerHome}>
        {objects.sort().map((object, index) => displayCard(object, index))}
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

// import React, { useState, useEffect } from "react";
// import { Button, Image, View, Platform } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import * as FileSystem from "expo-file-system";

// export default function ImagePickerExample() {
//   const openCamera = async () => {
//     let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

//     if (permissionResult.granted === false) {
//       alert("Permission to access camera roll is required!");
//       return;
//     }

//     let pickerResult = await ImagePicker.launchCameraAsync();

//     let imageURI = await copyFile(pickerResult);
//     console.log(imageURI);
//     return imageURI;
//   };

//   const pickImage = async () => {
//     // No permissions request is necessary for launching the image library
//     let pickerResult = await ImagePicker.launchImageLibraryAsync();

//     let imageURI = await copyFile(pickerResult);
//     return imageURI;
//   };

//   const copyFile = async (image) => {
//     let fileName = image.uri.substring(
//       image.uri.lastIndexOf("/") + 1,
//       image.uri.length
//     );
//     const uri = `${FileSystem.documentDirectory}${fileName}`;

//     await FileSystem.copyAsync({
//       from: image.uri,
//       to: uri,
//     });
//     return uri;
//   };

//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Button title="Pick an image from camera roll" onPress={openCamera} />
//       <Button title="Pick image from library" onPress={pickImage} />
//       {/* {image && (
//         <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
//       )} */}
//     </View>
//   );
// }
