import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'react-redux';
import Store from './store/Store';
import * as NavigationService from "./src/navigation/NavigationService.js";

class App extends Component {
  constructor() {
    super();
    this.state = { nombre: 'VRTourism'};
  }

  componentDidMount() {
    NavigationService.setNavigator(this.navigator);
  }

  render() {
    // console.disableYellowBox = true;
    return (
      <View style={styles.container}>
        <Provider store={Store}>
          <AppNavigator
            ref={nav => {
              this.navigator = nav;
            }}
          />
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

export default App;
