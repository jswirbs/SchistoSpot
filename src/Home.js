import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Text, TouchableOpacity } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import { Input, Button, ListItem } from 'react-native-elements';
import styles from './styles.js';
import { firebase } from './firebase.js';


// actions and their attributes to be listed on home page
const actions = [
  {
    title: 'Start patient analysis',
    icon: require('../assets/analysis-icon.png'),
    navigateTo: 'AnalysisStartScreen'
  },
  {
    title: 'View patient data',
    icon: require('../assets/patient-icon.png'),
    navigateTo: 'PatientScreen'
  },
  {
    title: 'View infection heatmap',
    icon: require('../assets/heatmap-icon.png'),
    navigateTo: 'HeatmapScreen'
  },
  {
    title: 'About',
    icon: require('../assets/about-icon.png'),
    navigateTo: 'AboutScreen'
  }
];


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

  logIn = () => {
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

  logOut = () => {
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
        <View>
          <Text style={stylesHome.textTitle}>SchistoSpot</Text>
          
          { // render ListItem's from actions array defined above
            actions.map((a, i) => (
              <ListItem
                key={i}
                Component={TouchableScale}
                friction={90} // passed to TouchableScale
                tension={100} // passed to TouchableScale
                leftAvatar={{ source: a.icon }}
                title={a.title}
                chevron
                containerStyle={{ backgroundColor: '#e4eeff' }}
                style={{ marginBottom: 10 }}
                onPress={() => navigate(a.navigateTo)}
              />
            ))
          }

          { /* last ListItem is for log out and is slightly different, so defined independently  */ }
          <ListItem
            Component={TouchableScale}
            friction={90} // passed to TouchableScale
            tension={100} // passed to TouchableScale
            leftAvatar={{ source: require('../assets/log-out-icon.png') }}
            title={'Log out'}
            chevron
            containerStyle={{ backgroundColor: '#e4eeff' }}
            onPress={this.logOut}
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
            onSubmitEditing={this.logIn}
          />
          <Button
            style={stylesHome.button}
            title='Log in'
            onPress={this.logIn}
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
    marginBottom: 40,
    marginLeft: 20,
    color: '#4466ee'
  },
  touchableOpacityGoToCamera: {
    marginBottom: 50,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#11111166'
  },
});
