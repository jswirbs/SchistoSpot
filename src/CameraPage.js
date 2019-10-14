import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';

import styles from './styles';

export default class CameraPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      photoUri: null
    }
  }

  async componentDidMount() {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const hasCameraPermission = (camera.status === 'granted');

    this.setState({ hasCameraPermission });
  };

  takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
    }
  };

  onPictureSaved = photo => {
    console.log('photoUri: ' + photo.uri);
    this.setState({ photoUri: photo.uri });
  };

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Camera permissions is null.</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }

    let content;

    // if photo has been taken, display it and a cancel button
    if (this.state.photoUri) {
      content = (
        <>
          <Image 
            style={styles.cameraPreview}
            source={{ uri: this.state.photoUri }} 
          />
          <TouchableOpacity
            style={styles.captureButton}
            onPress={() => this.setState({ photoUri: null })}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
        </>
      );

    // else, display the camera view and a capture button
    } else {
      content = (
        <>
          <Camera
            style={styles.cameraPreview}
            ref={camera => this.camera = camera}
          />
          <TouchableOpacity
            style={styles.captureButton}
            onPress={this.takePicture}
          >
            <Text>Capture</Text>
          </TouchableOpacity>
        </>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        { content }
      </View>
    );
  };
};