import React, { useState } from "react";
import { TextInput, SafeAreaView, StyleSheet, Text, View, Button } from "react-native";
import { Card } from 'react-native-paper';

const App = () => {
  const [text, setText,] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Card>
      <Card style={styles.card} >
          <Text style={styles.paragraph}>
          circle picture
          </Text>
        </Card>

        <Card>
          <Text style={styles.paragraph}>
          title text
          </Text>
        </Card>

        <Card>
        <TextInput
        style={{width: 150, height: 150}}
        placeholder=" Description de l'ajout!"
        onChangeText={newText => setText(newText)}
        defaultValue={text}
      />
        </Card>

        </Card>
      < Button style={styles.buttonHome} title="Valider" />

      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
   // flex :2,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20
  },
  card: {
    //flex: 1,
  }
});


// export default () => {

//   return (
//     <View >
//       <Text>Cards</Text>
//     </View>
//   );
// };
