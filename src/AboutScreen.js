import React from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import styles from './styles.js';


export default class AboutScreen extends React.Component {
  render() {
    return (
      <ScrollView style={stylesAbout.container}>
        <Text style={stylesAbout.textTitle}>About</Text>
        
        <Text>
          The SchistoSpot product is targeted for both individual people, and clinicians or school nurses. With the SchistoSpot, a user will have the ability to test urine samples for the presence of schistosoma eggs, without the need for extra equipment or a professionally trained doctor. Our product utilizes computer vision software to circumvent the need for a medically trained professional’s eye to analyze sample images. As a result, immediate diagnosis of schistosomiasis will be possible, allowing for earlier treatment to individuals suffering from the disease. In addition, targeted treatment delivery to only those patients that are infected can be achieved, as opposed to the mass treatment to patient populations, which is the current treatment strategy.
        </Text>

        <Text style={stylesAbout.header}>
          HARDWARE SETUP
        </Text>
        <Text style={stylesAbout.body}>
          1. Attach flexible plastic tubes to the imaging channel by pressing one capillary tube into each end of the imaging channel where a hole has been cut out. The capillary tube should fit snugly into the imaging channel holes, so ensure that the tubes are pressed as far into the channel as possible.
        </Text>
        <Text style={stylesAbout.body}>
          2. Place the imaging channel with plastic tubes attached in between the acrylic microscope stand platforms.
        </Text>
        <Text style={stylesAbout.body}>
          3. Thread the plastic tubes coming out from the imaging channel through the bottom of the microscope stand, where holes have been cut out.
        </Text>
        <Text style={stylesAbout.body}>
          4. Next, align your smartphone camera lens with the circular microscope lens that is press-fit into the the top platform of the microscope lens. 
        </Text>
        <Text style={stylesAbout.body}>
          4. Next, align your smartphone camera lens with the circular microscope lens that is press-fit into the the top platform of the microscope lens. 
        </Text>

        <Text style={stylesAbout.header}>
          RUNNING A DIAGNOSTIC TEST
        </Text>
        <Text style={stylesAbout.body}>
          1. Once the device has been setup, run the cleaning solution through the channel to clear any dust that has accumulated.
        </Text>
        <Text style={stylesAbout.body}>
          2. While looking through the iPhone camera app, adjust the height of the microscope platform so that the imaging channel comes into focus. Adjustments can be made by turning the stage screws to raise and lower the bottom stage’s height. You will know the channel is in focus when the edges of the channel form a single, thick line. Below is an image of the channel when looking through the iPhone that is out of focus, next to an image where the channel is in focus and ready to use.
        </Text>
        <Text style={stylesAbout.body}>
          3. gather the collected samples and transfer them into IV bags if they are in a different container.
        </Text>
        <Text style={stylesAbout.body}>
          4. Hook the longer plastic tube into the IV bag and ensure the fit is snug so no sample is leaking.
        </Text>
        <Text style={stylesAbout.body}>
          5. Lay the shorter plastic tube into a separate container to collect the sample once it begins flowing. 
        </Text>
        <Text style={stylesAbout.body}>
          6. Open the SchistoSpot app on an android or iOS smartphone device.
        </Text>
        <Text style={stylesAbout.body}>
          7. Login if not already authenticated, then press the “Start patient analysis” button to begin.         
        </Text>
        <Text style={stylesAbout.body}>
          8. If diagnosing a new patient or individual, enter information to create a new patient profile, otherwise, enter the existing patients id or email and then press “Confirm”.
        </Text>
        <Text style={stylesAbout.body}>
          9. The app will proceed to the analysis screen and when ready, hit the “Begin analysis” button. 
        </Text>
        <Text style={stylesAbout.body}>
          10. Raise the IV bag to a height approximately 2 feet above the device to begin gravity-driven flow through the microfluidic channel.
        </Text>
        <Text style={stylesAbout.body}>
          11. Once the sample has finished flowing, unhook the IV bag and safely store the collected sample in case additional runs are needed in the future. 
        </Text>

        {/* This provides some spacing at the bottom */}
        <Text style={stylesAbout.header}>
        </Text>

      </ScrollView>
    )
  }
}


const stylesAbout = StyleSheet.create({
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
  header: {
    fontSize: 20,
    marginTop: 16,
    marginBottom: 6
  },
  body: {
    marginBottom: 4
  }
});
