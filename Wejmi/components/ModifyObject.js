import { View } from "react-native";

import Cards from "./Cards";

export default ({ route }) => {
  const objectInformation = route.params.object;
  console.log(objectInformation);
  return (
    <View>
      <Cards
        name={objectInformation.name}
        place={objectInformation.place}
        compartment={objectInformation.compartment}
        furnitureItem={objectInformation.furniture}
        status={objectInformation.status}
        description={objectInformation.description}
        image={objectInformation.image}
      ></Cards>
    </View>
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
