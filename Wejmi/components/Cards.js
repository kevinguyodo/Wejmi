import { StyleSheet } from "react-native-web";
import { Card, Title, Paragraph } from "react-native-paper";
import { TouchableOpacity } from "react-native";

export default ({
  name,
  place,
  compartment,
  furnitureItem,
  description,
  image,
  modifyObject,
}) => {
  const displayImage = () => {
    if (image.length === 0) {
      return;
    } else {
      return <Card.Cover source={{ uri: image }} />;
    }
  };
  return (
    <TouchableOpacity onLongPress={modifyObject}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{name}</Title>
          <Paragraph>Endroit : {place}</Paragraph>
          <Paragraph>Compartiment : {compartment}</Paragraph>
          <Paragraph>Meuble : {furnitureItem}</Paragraph>
          <Paragraph>Description : {description}</Paragraph>
        </Card.Content>
        {displayImage()}
      </Card>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#9E9E9E",
    marginLeft: 10,
    marginRight: 10,
    padding: 20,
    marginVertical: 10,
  },
});
