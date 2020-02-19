import React from 'react';
import MapView from 'react-native-maps';
import Heatmap from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import { db, firebase } from './firebase.js';


export default class HeatmapScreen extends React.Component {
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
        infectionsCoordinates.push({
          latitude: doc.data().coordinates.latitude,
          longitude: doc.data().coordinates.longitude,
          weight: 1
        });
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
    console.log(this.state.infectionsCoordinates);
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

          {
            (this.state.infectionsCoordinates.length > 0) &&
              (
                <Heatmap 
                  points={this.state.infectionsCoordinates}
                  radius={20}
                  opacity={1}
                  gradient={{colors: ["#FF0000", "#FFFF00", "#00FF00"], startPoints: [0, .5, 1]}}
                />
              )
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
