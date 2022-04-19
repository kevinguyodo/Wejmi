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
              console.log(
                objects.map((c) => {
                  return c;
                })
              );
              test();
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
 });







// import React, { useState, useEffect } from "react";
// import { Button, Image, View, Platform } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import * as FileSystem from "expo-file-system";

// const document = FileSystem.documentDirectory;

// export default () => {
//   const [image, setImage] = useState(null);

//   const openCamera = async () => {
//     // Ask the user for the permission to access the camera
//     const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

//     if (permissionResult.granted === false) {
//       alert("You've refused to allow this appp to access your camera!");
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync();
//     FileSystem.copyAsync(result.uri, document + "images/");
//     console.log(result.uri);
//     // if ((await FileSystem.getInfoAsync()).exists) {
//     //   console.log("exist");
//     // } else {
//     //   console.log("doesn't exist");
//     // }

//     // result.uri = document + "first_pictures_test.jpg";
//     // setImage(result.uri);
//     // Explore the result
//     console.log(document);
//     console.log(result.base64);

//     // if (!result.cancelled) {
//     //   setPickedImagePath(result.uri);
//     //   console.log(result.uri);
//     // }
//   };

//   const pickImage = async () => {
//     // No permissions request is necessary for launching the image library
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//       uri: document + image,
//     });
//     // console.log("\n");
//     // console.log(result.uri);
//     // console.log("\n");
//     // console.log(document);
//     // console.log("\n");
//     // console.log(image);

//     if (!result.cancelled) {
//       setImage(result.uri);
//     }
//   };

//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Button title="Pick an image from camera roll" onPress={pickImage} />
//       <Button title="Take picture" onPress={openCamera} />
//       {image && (
//         <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
//       )}
//     </View>
    
//   );
// };