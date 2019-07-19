import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Map from '../../components/Map';

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Map />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

export default Home;
