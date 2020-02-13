import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import { db, firebase } from './firebase.js';


export default class HeatmapView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      infections: [],
      infectionsCoordinates: []
    }
  }

  componentDidMount() {
    db.collectionGroup('diagnoses').where('infected', '==', true).get().then(querySnapshot => {
      
      let infections = [];
      let infectionsCoordinates = [];

      querySnapshot.forEach(doc => {
        infections.push(doc.data());
        infectionsCoordinates.push(doc.data().coordinates);
      })

      this.setState({
        infections: infections,
        infectionsCoordinates: infectionsCoordinates
      });

    }).catch(error => {
      console.error('Error getting positive diagnoses from db: ', error);
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.mapStyle}>
          {
            this.state.infections.map((infection, i) => (
              <MapView.Marker
                key={i}
                coordinate={infection.coordinates}
                title={"Infection"}
                description={infection.timestamp.toDate().toString()}
              />
            ))
          }


          
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
