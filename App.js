import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import {Provider} from 'react-redux';
import Store from './store/Store';

export default class App extends Component {
  // constructor() {
  //   super();
  //   this.state = { nombre: 'VRTourism'};
  // };

  render() {
    return (
      <View style={styles.container}>
        <Provider store={Store}>
          <AppNavigator/>
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }  
});