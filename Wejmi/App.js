import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Home from "./components/Home";
import CreateObject from "./components/CreateObject";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const { Navigator, Screen } = createNativeStackNavigator();

const Nav = () => {
  return (
    <Navigator screenOptions={{ headerTitleAlign: "center" }}>
      
      <Screen name="Bibliothèque" component={Home} 
 />
      <Screen name="Create" component={CreateObject}
 />
    </Navigator>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Nav></Nav>
      </NavigationContainer>

      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
