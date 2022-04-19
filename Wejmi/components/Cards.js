import { StyleSheet } from "react-native-web";
import { Card, Title, Paragraph } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { arrayOfStatus } from "./Home";

export default ({
  name,
  place,
  compartment,
  furnitureItem,
  status,
  description,
  image,
  modifyObject,
}) => {
  // Affichage conditionnel
  const displayImage = () => {
    if (image.length === 0) {
      return;
    } else {
      return <Card.Cover source={{ uri: image }} />;
    }
  };

  const displayParagraph = (objectElement, value) => {
    if (value === "") {
      return;
    } else {
      return (
        <Paragraph>
          {objectElement} : {value}
        </Paragraph>
      );
    }
  };

  const statusEmoticon = () => {
    if (status === arrayOfStatus[0]) {
      return <Title>{name} 🟢</Title>;
    } else if (status === arrayOfStatus[1]) {
      return <Title>{name} 🟡</Title>;
    } else {
      return <Title>{name} 🔴</Title>;
    }
  };
  return (
    <TouchableOpacity onLongPress={modifyObject}>
      <Card style={styles.card}>
        <Card.Content>{statusEmoticon()}</Card.Content>
        <Card.Content>
          {displayParagraph("Endroit", place)}
          {displayParagraph("Compartiment", compartment)}
          {displayParagraph("Meuble", furnitureItem)}
          {displayParagraph("Status", status)}
          {displayParagraph("Description", description)}
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
