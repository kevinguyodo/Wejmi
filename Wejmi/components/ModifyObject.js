import { View } from "react-native";

import Cards from "./Cards";

export default ({ route }) => {
  const objectInformation = route.params.object;
  console.log(objectInformation.name);
  return (
    <View>
      <Cards
        name={objectInformation.name}
        place={objectInformation.place}
        compartment={objectInformation.compartment}
        furnitureItem={objectInformation.furnitureItem}
        description={objectInformation.description}
        image={objectInformation.image}
      ></Cards>
    </View>
  );
};
