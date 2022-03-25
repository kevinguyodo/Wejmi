import React, { Component } from "react";
import { Button, Text, View } from "react-native";

const data = require('../data/FilterData.json');
console

class ModifyObject extends Component {
  render() {
    return (
    <View>
      
      {
      data.name.map((chicha) => (<View><Text>{chicha}</Text></View>))
      }
    
        
      
      
      
    </View>
    );
  }
}
export default ModifyObject;