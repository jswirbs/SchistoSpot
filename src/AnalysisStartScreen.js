import React from 'react';
import { View, KeyboardAvoidingView, Text, StyleSheet } from 'react-native';
import { ButtonGroup, Input, Button } from 'react-native-elements';

import { db, firebase } from './firebase.js';

import styles from './styles.js';


const inputRef = React.createRef();


export default class AnalysisStartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  componentDidMount() {
    inputRef.current.focus();
  }

  updateIndex = selectedIndex => {
    this.setState({selectedIndex});
  }

  /**
   * Confirm an existing patient profile with `this.state.patientIdOrEmail`,
   * then navigate to CameraScreen
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
          this.props.navigation.navigate('CameraScreen', {
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

  /**
   * Create a new patient profile with `this.state.name` and `this.state.email`,
   * then navigate to CameraScreen
   */
  createPatientProfile = () => {
    if (this.state.name == null) {
      this.setState({
        errorMessage: 'Please enter a name.'
      });
      return;
    }
    if (this.state.email == null) {
      this.setState({
        errorMessage: 'Please enter an email.'
      });
      return;
    }

    // first check if a patient with this email already exists
    db.collection('patients').where('email', '==', this.state.email).get().then(querySnapshot => {
      // if so, set error message
      if (!querySnapshot.empty) {
        this.setState({
          email: null,
          errorMessage: 'A patient with this email already exists.'
        })
      // else, attempt to add a new patient profile
      } else {
        db.collection('patients').add({
          name: this.state.name,
          email: this.state.email,
          timestamp: firebase.firestore.Timestamp.fromDate(new Date())
        })
        .then(doc => {
          // on success, navigate to the CameraScreen to start analysis
          this.props.navigation.navigate('CameraScreen', {
            patientId: doc.id,
            patientData: {
              name: this.state.name,
              email: this.state.email,
            }
          });
        })
        .catch(error => {
          console.error('Error adding patient doc: ', error);
        });
      }
    }).catch(error => {
      console.error('Error checking if patient doc already exists: ', error);
    })
  }

  render () {
    const buttons = ['Existing patient', 'New patient'];
    const { selectedIndex } = this.state;

    let content;

    if (selectedIndex === 0) {
      content = (
        <>
          <Text style={stylesASS.textHeader}>Enter existing patient information.</Text>
          <Input
            ref={inputRef}
            containerStyle={styles.input}
            value={this.state.patientIdOrEmail}
            onChangeText={text => this.setState({ patientIdOrEmail: text })}
            placeholder='patient id or email'
            keyboardType='email-address'
            onSubmitEditing={this.confirmExistingPatientProfile}
          />
          <Button
            style={styles.button}
            title='Confirm this patient profile'
            onPress={this.confirmExistingPatientProfile}
          /> 
        </>
      );
    } else {
      content = (
        <>
          <Text style={stylesASS.textHeader}>Create new patient profile.</Text>
          <Input
            ref={inputRef}
            containerStyle={styles.input}
            value={this.state.name}
            onChangeText={text => this.setState({ name: text })}
            placeholder='name'
          />
          <Input
            containerStyle={styles.input}
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
            placeholder='email'
            keyboardType='email-address'
            onSubmitEditing={this.createPatientProfile}
          />
          <Button
            style={styles.button}
            title='Create patient profile'
            onPress={this.createPatientProfile}
          /> 
        </>
      );
    }

    return (
      <View style={styles.container}>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
        />
        { content }

        <Text style={stylesASS.textErrorMessage}>
          { this.state.errorMessage }
        </Text>
      </View>
    );
  }

};


const stylesASS = StyleSheet.create({
  textHeader: {
    fontSize: 20,
    padding: 20
  },
  textErrorMessage: {
    fontSize: 20,
    padding: 20,
    color: '#bb2222'
  }
});

