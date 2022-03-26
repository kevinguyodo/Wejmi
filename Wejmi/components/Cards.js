import { StyleSheet } from "react-native-web";
import { Card, Title, Paragraph } from "react-native-paper";

export default ({ name, place, compartment, furnitureItem, description }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{name}</Title>
        <Paragraph>Endroit : {place}</Paragraph>
        <Paragraph>Compartiment : {compartment}</Paragraph>
        <Paragraph>Meuble : {furnitureItem}</Paragraph>
        <Paragraph>Description : {description}</Paragraph>
      </Card.Content>
    </Card>
  );
};
const styles = StyleSheet.create({
  card: {
    marginTop: 30,
    backgroundColor: "#9E9E9E",
    marginLeft: 10,
    marginRight: 10,
    height: 250,
  },
});
