import React from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import styles from './styles.js';

import { db, firebase } from './firebase.js';


export default class PatientDataScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patientData: null,
      diagnoses: []
    };
  }

  componentDidMount() {
    if (!this.props.navigation.state.params.patientId || !this.props.navigation.state.params.patientData) {
      this.props.navigation.navigate('PatientConfirmScreen');
    } else {
      this.setState({
        patientId: this.props.navigation.state.params.patientId,
        patientData: this.props.navigation.state.params.patientData
      });

      // query firebase for diagnoses subcollection for this patient
      db.collection('patients').doc(this.props.navigation.state.params.patientId).collection('diagnoses').get().then(querySnapshot => {
        let diagnoses = [];
        querySnapshot.forEach(function (doc) {
          diagnoses.push(doc.data());
        });
        this.setState({diagnoses: diagnoses});
      }).catch(error => {
        console.error('Error querying diagnoses subcollection: ', error);
      })
    }
  }

  render() {
    return (
      <ScrollView style={stylesPatientData.container}>
        <Text style={stylesPatientData.textTitle}>Patient data</Text>
        
        <Text style={stylesPatientData.textBody}>Name: {this.state.patientData ? this.state.patientData.name : null}</Text>
        <Text style={stylesPatientData.textBody}>Email: {this.state.patientData ? this.state.patientData.email : null}</Text>
        <Text style={stylesPatientData.textBody}>Created: {this.state.patientData ? this.state.patientData.timestamp.toDate().toString() : null}</Text>
        <Text style={stylesPatientData.textBody}>Diagnoses: </Text>

        {
          this.state.diagnoses.map((d, i) => (
            <ListItem
              key={i}
              title={d.infected ? 'Positive diagnosis' : 'Negative diagnosis'}
              subtitle={d.timestamp.toDate().toString()}
              topDivider
              containerStyle={d.infected ? {backgroundColor: '#ff9999'} : {}}
            />
          ))
        }

      </ScrollView>
    )
  }
}


const stylesPatientData = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 100,
  },
  textTitle: {
    fontSize: 30,
    marginTop: 40,
    marginBottom: 40
  },
  textBody: {
    fontSize: 20,
    marginBottom: 4
  }
});
