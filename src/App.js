import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './Home.js';
import CameraScreen from './CameraScreen.js';
import AnalysisStartScreen from './AnalysisStartScreen.js';
import HeatmapView from './HeatmapView.js';
import About from './About.js';



const MainNavigator = createStackNavigator({
  Home: Home,
  AnalysisStartScreen: AnalysisStartScreen,
  CameraScreen: CameraScreen,
  HeatmapView: HeatmapView,
  About: About,
});

const App = createAppContainer(MainNavigator);

export default App;



