import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import ScanScreen from './screens/scanscreen';

export default class App extends React.Component{
   render(){
     return(
       <AppContainer/>
     )
   }
}

const TabNavigator = createBottomTabNavigator({
  Home : {screen : ScanScreen}
});

const AppContainer = createAppContainer(TabNavigator);