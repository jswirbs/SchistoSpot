import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import CameraPage from './CameraPage.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      renderCamera: false
    }
  }

  
  render() {
    if (this.state.renderCamera) {
      return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={() => this.setState({renderCamera: false})}>
            <Text>back</Text>
          </TouchableOpacity>
          <CameraPage />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text>Home</Text>
        <TouchableOpacity onPress={() => this.setState({renderCamera: true})} >
          <Text>Go to camera</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 3,
  },
  backButtonText: {
    fontSize: 30,
    color: 'white'
  }
});
