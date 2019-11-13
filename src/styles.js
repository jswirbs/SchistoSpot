import { StyleSheet, Dimensions } from 'react-native';

const { width: winWidth, height: winHeight } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // backButton: {
  //   position: 'absolute',
  //   top: 50,
  //   left: 20,
  //   zIndex: 3,
  //   padding: 10,
  //   borderRadius: 5,
  //   backgroundColor: '#11111166'
  // },
  // backButtonText: {
  //   fontSize: 20,
  //   color: '#ffffff'
  // },
  button: {
    marginBottom: 24
  },
  input: {
    width: '90%',
    marginBottom: 12
  }
});