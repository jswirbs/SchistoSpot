import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './Home.js';
import CameraScreen from './CameraScreen.js';
import AnalysisStartScreen from './AnalysisStartScreen.js';
import HeatmapScreen from './HeatmapScreen.js';
import AboutScreen from './AboutScreen.js';
import PatientConfirmScreen from './PatientConfirmScreen.js';
import PatientDataScreen from './PatientDataScreen.js';


const MainNavigator = createStackNavigator({
  Home: Home,
  AnalysisStartScreen: AnalysisStartScreen,
  CameraScreen: CameraScreen,
  HeatmapScreen: HeatmapScreen,
  AboutScreen: AboutScreen,
  PatientConfirmScreen: PatientConfirmScreen,
  PatientDataScreen: PatientDataScreen,
});

const App = createAppContainer(MainNavigator);

export default App;



