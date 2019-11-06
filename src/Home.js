import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Text, TouchableOpacity, TextInput, Button } from 'react-native';
import styles from './styles.js';
import { firebase } from './firebase.js';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      cuser: null
    }
  }

  componentDidMount() {
    // firebase auth, check if user logged in and if so set `this.state.cuser`
    //firebase.auth().currentUserorsomething
    
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ 
          loading: false,
          cuser: user 
        });
      } else {
        this.setState({ 
          loading: false,
          cuser: null 
        });
      }
    });
  }

  signIn = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
      this.setState({
        errorCode: null,
        errorMessage: null
      })
    }).catch(error => {
      this.setState({
        errorCode: error.code,
        errorMessage: error.message
      })
    });
  }

  signOut = () => {
    firebase.auth().signOut().catch(error => {
      console.error(error.code + ' => ' + error.message);
    });
  }

  render() {
    const { navigate } = this.props.navigation;

    if (this.state.loading) {
      return null;

    // user logged in 
    } else if (this.state.cuser) {
      return (
        <View style={styles.container}>
          <Text style={stylesHome.textTitle}>SchistoSpot</Text>
          <TouchableOpacity style={stylesHome.touchableOpacityGoToCamera} onPress={() => navigate('CameraScreen')} >
            <Text>Go to camera</Text>
          </TouchableOpacity>
          <Button
            style={stylesHome.buttonSignIn}
            title='Sign out'
            onPress={this.signOut}
          /> 
        </View>
      );

    // no user logged in
    } else {
      return (
        <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
          <Text style={stylesHome.textTitle}>SchistoSpot</Text>
          <TextInput
            style={stylesHome.textInput}
            onChangeText={text => this.setState({ email: text })}
            placeholder='email'
            autoFocus={true}
          />
          <TextInput
            style={stylesHome.textInput}
            onChangeText={text => this.setState({ password: text })}
            placeholder='password'
            secureTextEntry={true}
            onSubmitEditing={this.signIn}
          />
          <Button
            style={stylesHome.buttonSignIn}
            title='Sign in'
            onPress={this.signIn}
          /> 
          { this.state.errorMessage && 
            <Text style={stylesHome.TextErrorMessage}>{this.state.errorMessage}</Text>
          }
        </KeyboardAvoidingView>
      );
    }

  }
}


const stylesHome = StyleSheet.create({
  textInput: {
    width: '80%',
    padding: 4,
    margin: 5,
    backgroundColor: '#dddddd',
    fontSize: 20
  },
  textErrorMessage: {
    color: '#884444'
  },
  buttonSignIn: {

  },
  textTitle: {
    fontSize: 30,
    marginBottom: 40
  },
  touchableOpacityGoToCamera: {
    marginBottom: 50,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#11111166'
  },
});
