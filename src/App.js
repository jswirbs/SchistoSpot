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
            <Text style={styles.backButtonText}>back</Text>
          </TouchableOpacity>
          <CameraPage />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>SchistoSpot</Text>
        <TouchableOpacity style={styles.goToCameraButton} onPress={() => this.setState({renderCamera: true})} >
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
  title: {
    fontSize: 30,
    marginBottom: 40
  },
  goToCameraButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#11111166'
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 3,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#11111166'
  },
  backButtonText: {
    fontSize: 20,
    color: '#ffffff'
  }
});
