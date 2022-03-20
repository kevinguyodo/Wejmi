import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Button, View } from "react-native";
import Home from "./components/Home";
import ObjectDetails from "./components/ObjectDetails";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const { Navigator, Screen } = createNativeStackNavigator();

const Nav = () => {
  <Navigator>
    <Screen name="Home" components={Home} />
    <Screen name="Details" components={ObjectDetails} />
  </Navigator>;
};

export default function App() {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Home></Home>
        <Button style={styles.buttonHome} title="home">
          Go to home
        </Button>
        {/* <Text>Open up App.js to start working on your app!</Text> */}
        <StatusBar style="auto" />
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonHome: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});
