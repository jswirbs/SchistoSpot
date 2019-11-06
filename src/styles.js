import { StyleSheet, Dimensions } from 'react-native';

const { width: winWidth, height: winHeight } = Dimensions.get('window');

export default StyleSheet.create({
  cameraPreview: {
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
    borderRadius: 5,
    backgroundColor: '#11111166'
  },
  backButtonText: {
    fontSize: 20,
    color: '#ffffff'
  }
});