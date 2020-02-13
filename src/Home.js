import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Text, TouchableOpacity } from 'react-native';
import { Input, Button, ListItem } from 'react-native-elements';
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
          
          <ListItem
            key={1}
            leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' } }}
            title={'Start patient analysis'}
            bottomDivider
            chevron
          />

          <TouchableOpacity style={stylesHome.touchableOpacityGoToCamera} onPress={() => navigate('CameraScreen')} >
            <Text>Go to camera</Text>
          </TouchableOpacity>


          <Button
            style={styles.button}
            title='Start patient sample analysis'
            onPress={() => navigate('AnalysisStartScreen')}
          /> 

          <Button
            style={styles.button}
            title='Go to heatmap'
            onPress={() => navigate('HeatmapView')}
          /> 

          <Button
            style={styles.button}
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
          <Input
            containerStyle={styles.input}
            leftIcon={{ type: 'font-awesome', name: 'envelope', color: '#bbb', paddingRight: 8 }}
            onChangeText={text => this.setState({ email: text })}
            placeholder='email'
            autoFocus={true}
          />
          <Input
            containerStyle={styles.input}
            leftIcon={{ type: 'font-awesome', name: 'lock', color: '#bbb', paddingRight: 12, paddingLeft: 4 }}
            onChangeText={text => this.setState({ password: text })}
            placeholder='password'
            secureTextEntry={true}
            onSubmitEditing={this.signIn}
          />
          <Button
            style={stylesHome.button}
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
  textTitle: {
    fontSize: 30,
    marginTop: 40,
    marginBottom: 40
  },
  touchableOpacityGoToCamera: {
    marginBottom: 50,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#11111166'
  },
});
