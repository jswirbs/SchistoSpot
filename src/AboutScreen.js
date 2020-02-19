import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import styles from './styles.js';


export default class AboutScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={stylesAbout.textTitle}>About</Text>
        
        
      </View>
    )
  }
}


const stylesAbout = StyleSheet.create({
  textInput: {
    width: '80%',
    padding: 4,
    margin: 5,
    backgroundColor: '#dddddd',
    fontSize: 20
  },
  textErrorMessage: {
    color: '#884444'
  },
  textTitle: {
    fontSize: 30,
    marginTop: 40,
    marginBottom: 40
  },
  touchableOpacityGoToCamera: {
    marginBottom: 50,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#11111166'
  },
});
