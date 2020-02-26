import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import styles from './styles.js';

import { db, firebase } from './firebase.js';


const inputRef = React.createRef();

export default class PatientConfirmScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patientIdOrEmail: null
    };
  }

  componentDidMount() {
    inputRef.current.focus();
  }

  /**
   * Confirm an existing patient profile with `this.state.patientIdOrEmail`,
   * then navigate to PatientDataScreen
   */
  confirmExistingPatientProfile = () => {
    if (this.state.patientIdOrEmail == null) {
      this.setState({
        errorMessage: 'Please enter a patient id or email.'
      });
    // if `this.state.patientIdOrEmail` is an email, get doc with email
    } else if (this.state.patientIdOrEmail.includes('@')) {
      db.collection('patients').where('email', '==', this.state.patientIdOrEmail).get().then(querySnapshot => {
        // if so, set error message
        if (querySnapshot.empty) {
          this.setState({
            email: null,
            errorMessage: 'A patient with this email was not found.'
          });
        // else, attempt to add a new patient profile
        } else {
          let doc = querySnapshot.docs[0];
          this.props.navigation.navigate('PatientDataScreen', {
            patientId: doc.id,
            patientData: doc.data()
          });
        }
      }).catch(error => {
        console.error('Error checking if patient doc already exists: ', error);
      })
    // else, get doc by id
    } else {
      db.collection('patients').doc(this.state.patientIdOrEmail).get().then(doc => {
        // if doc does not exist, set error message
        if (!doc.exists) {
          this.setState({
            patientIdOrEmail: null,
            errorMessage: 'Patient profile with id \'' + this.state.patientIdOrEmail + '\' not found.'
          })
        // else, navigate to CameraScreen with this doc info
        } else {
          this.props.navigation.navigate('CameraScreen', {
            patientId: doc.id,
            patientData: doc.data()
          });
        }
      }).catch(error => {
        console.error('Error confirming patient doc: ', error);
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={stylesPatientConfirm.textTitle}>Enter patient ID or email</Text>
        <Input
          ref={inputRef}
          containerStyle={styles.input}
          value={this.state.patientIdOrEmail}
          onChangeText={text => this.setState({ patientIdOrEmail: text })}
          placeholder='patient id or email'
          keyboardType='email-address'
          onSubmitEditing={this.confirmExistingPatientProfile}
          focus
        />
        <Button
          style={styles.button}
          title='Confirm patient profile'
          onPress={this.confirmExistingPatientProfile}
        />

        <Text style={stylesPatientConfirm.textErrorMessage}>
          { this.state.errorMessage }
        </Text>
        
      </View>
    )
  }
}


const stylesPatientConfirm = StyleSheet.create({
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
  textErrorMessage: {
    fontSize: 20,
    padding: 20,
    color: '#bb2222'
  }
});
