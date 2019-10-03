import { StyleSheet, Dimensions } from 'react-native';

const { width: winWidth, height: winHeight } = Dimensions.get('window');

export default StyleSheet.create({
  cameraPreview: {
    height: winHeight - 100,
    width: winWidth,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  captureButton: {
    position: 'absolute',
    zIndex: 2,
    width: winWidth,
    bottom: 50,
    alignItems: 'center'
  }
});