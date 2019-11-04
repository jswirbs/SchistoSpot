import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles.js';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cuser: null
    }
  }

  componentDidMount() {
    // firebase auth, check if user logged in and if so set `this.state.cuser`
  }

  render() {
    const { navigate } = this.props.navigation;

    // if `this.state.cuser`, display home screen, else prompt login and then set `this.state.cuser`

    return (
      <View style={styles.container}>
        <Text style={styles.title}>SchistoSpot</Text>
        <TouchableOpacity style={styles.goToCameraButton} onPress={() => navigate('CameraScreen')} >
          <Text>Go to camera</Text>
        </TouchableOpacity>
      </View>
    )
  }
}