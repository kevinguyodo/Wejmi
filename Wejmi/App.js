import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Home from "./components/Home";
import ObjectDetails from "./components/ObjectDetails";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const { Navigator, Screen } = createNativeStackNavigator();

const Nav = () => {
  return (
    <Navigator>
      <Screen name="Home" component={Home} />
      <Screen name="Details" component={ObjectDetails} />
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
