import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './Home.js';
import CameraScreen from './CameraScreen.js';
import AnalysisStartScreen from './AnalysisStartScreen.js';
import HeatmapScreen from './HeatmapScreen.js';
import AboutScreen from './AboutScreen.js';
import PatientScreen from './PatientScreen.js';


const MainNavigator = createStackNavigator({
  Home: Home,
  AnalysisStartScreen: AnalysisStartScreen,
  CameraScreen: CameraScreen,
  HeatmapScreen: HeatmapScreen,
  AboutScreen: AboutScreen,
  PatientScreen: PatientScreen,
});

const App = createAppContainer(MainNavigator);

export default App;



