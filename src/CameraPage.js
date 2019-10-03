import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';

import styles from './styles';

export default class CameraPage extends React.Component {
    camera = null;

    state = {
        hasCameraPermission: null,
    };

    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const hasCameraPermission = (camera.status === 'granted');

        this.setState({ hasCameraPermission });

        FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos').catch(e => {
          console.log(e, 'Directory exists');
        });
    };

    takePicture = () => {
        if (this.camera) {
            this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
        }
    };

    onPictureSaved = async photo => {
        await FileSystem.moveAsync({
            from: photo.uri,
            to: `${FileSystem.documentDirectory}photos/${Date.now()}.jpg`,
        });
        this.setState({ newPhotos: true });
    }

    render() {
        const { hasCameraPermission } = this.state;

        if (hasCameraPermission === null) {
            return <Text>wut.</Text>;
        } else if (hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }

        return (
            <View style={{ flex: 1 }}>
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
            </View>
        );
    };
};