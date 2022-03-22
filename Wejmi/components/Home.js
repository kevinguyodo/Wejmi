import {
  Text,
  View,
  Button,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

export default ({ navigation }) => {
  const viewDetails = () => {
    navigation.navigate("Create");
  };
  const ViewCreate = () => {
    navigation.navigate("Create");
    console.log("create Page");
  };

  const onPress = () => {
    console.log("Ca marche GG");
  };

  return (
    <View>
      {/* -------------------------------------------------------------------------------- */}
      <View style={styles.containHeader}>
        <Button
          style={styles.header}
          title="Create Card"
          onPress={ViewCreate}
          color="#616161"
        ></Button>
      </View>
      {/* -------------------------------------------------------------------------------- */}

      <View style={styles.inputTxt}>
        <TextInput
          style={{ height: 40, paddingLeft: 10 }}
          placeholder="   Trouve ton objet Marmoud ..."
        />
      </View>
      {/* -------------------------------------------------------------------------------- */}

      <ScrollView style={styles.containerHome}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Card
            style={{
              marginTop: 30,
              backgroundColor: "#9E9E9E",
              marginLeft: 10,
              marginRight: 10,
              height: 250,
            }}
          >
            <Card.Content>
              <Title>Bébé tismey</Title>
              <Paragraph>Salut le S, c'est david</Paragraph>
            </Card.Content>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Card
            style={{
              marginTop: 30,
              backgroundColor: "#9E9E9E",
              marginLeft: 10,
              marginRight: 10,
              height: 250,
            }}
          >
            <Card.Content>
              <Title>Bébé tismey</Title>
              <Paragraph>Salut le S, c'est david</Paragraph>
            </Card.Content>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Card
            style={{
              marginTop: 30,
              backgroundColor: "#9E9E9E",
              marginLeft: 10,
              marginRight: 10,
              height: 250,
            }}
          >
            <Card.Content>
              <Title>Bébé tismey</Title>
              <Paragraph>Salut le S, c'est david</Paragraph>
            </Card.Content>
          </Card>
        </TouchableOpacity>
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
