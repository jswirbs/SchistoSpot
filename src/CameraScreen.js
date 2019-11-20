import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';

import styles from './styles.js';

const CAPTURE_INTERVAL_TIME = 1000;  // interval at which to capture photos, in milliseconds

export default class CameraScreen extends React.Component {
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

  /**
   * Take a picture through expo-camera
   */
  takePicture = () => {
    if (this.camera) {
      var count = 0;
      let captureInterval = setInterval(() => { 
        this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved }).then(() => {
          count++;
          console.log(count);
        }).catch(error => {
          console.log('noooo: ', error);
        }); 
      }, CAPTURE_INTERVAL_TIME);
      this.setState({ captureInterval });
    }
  };

  /**
   * Callback function for expo-camera 'onPictureSaved' event.
   * Sets the `photoUri` attribute in the state
   * 
   * @param  {Object} photo
   */
  onPictureSaved = photo => {
    console.log('photoUri: ' + photo.uri);
    this.setState({ photoUri: photo.uri });
  };

  /**
   * Cancel photo display and image capture interval, then return to camera preview screen
   */
  cancel = () => {
    if (this.state.captureInterval) {
      clearInterval(this.state.captureInterval);
    }
    this.setState({ 
      captureInterval: null,
      photoUri: null 
    })
  }

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
            style={stylesCS.image}
            source={{ uri: this.state.photoUri }} 
          />
          <TouchableOpacity
            style={stylesCS.captureButton}
            onPress={this.cancel}
          >
            <Text style={stylesCS.captureButtonText}>Cancel</Text>
          </TouchableOpacity>
        </>
      );

    // else, display the camera view and a capture button
    } else {
      content = (
        <>
          <TouchableOpacity
            style={stylesCS.captureButton}
            onPress={this.takePicture}
          >
            <Text style={stylesCS.captureButtonText}>Capture</Text>
          </TouchableOpacity>
        </>
      );
    }

    return (
      <View style={styles.container}>
        <Camera
          style={stylesCS.cameraPreview}
          ref={camera => this.camera = camera}
        />
        { content }
      </View>
    );
  };
};


const { width: winWidth, height: winHeight } = Dimensions.get('window');

const stylesCS = StyleSheet.create({
  cameraPreview: {
    zIndex: 1,
    height: winHeight,
    width: winWidth,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  image: {
    zIndex: 2,
    position: 'absolute',
    height: winHeight,
    width: winWidth,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  captureButton: {
    zIndex: 2,
    bottom: 150,
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#11111166',
  },
  captureButtonText: {
    color: '#fff',
    fontSize: 20
  },
});