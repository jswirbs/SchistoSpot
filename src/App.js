import React from 'react';
import { StyleSheet, TouchableOpacity, Text, SafeAreaView, View } from 'react-native';
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
            <Text style={styles.backButtonText}>back</Text>
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
    padding: 10,
    backgroundColor: '#11111166',
    borderRadius: 6
  },
  backButtonText: {
    fontSize: 20,
    color: '#ffffff'
  }
});
