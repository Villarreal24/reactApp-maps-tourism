import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import MapView  from 'react-native-maps';

class Map extends Component {
  render() {
    return (
      <MapView
        showsUserLocation={true}
        showsMyLocation={true}
        followsUserLocation={true}
        style={styles.map}
        initialRegion={{
          latitude: this.props.userLatitude,
          longitude: this.props.userLongitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
