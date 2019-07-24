import React, { Component } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Map from '../../components/Map';
import PlaceInput from '../../components/PlaceInput';
import BarStatus from '../../components/common/BarStatus';

class Home extends Component {
  hideKeyboard() {
    Keyboard.dismiss();
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.hideKeyboard}>
        <View style={styles.container}>
          <BarStatus />
          <Map />
          <PlaceInput />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
