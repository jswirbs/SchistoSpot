import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './Home.js';
import CameraScreen from './CameraScreen.js';
import AnalysisStartScreen from './AnalysisStartScreen.js';
import HeatmapView from './HeatmapView.js';



const MainNavigator = createStackNavigator({
  Home: Home,
  AnalysisStartScreen: AnalysisStartScreen,
  CameraScreen: CameraScreen,
  HeatmapView: HeatmapView,
});

const App = createAppContainer(MainNavigator);

export default App;



