import React, { Component } from 'react';
import { StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import MapView  from 'react-native-maps';

class Map extends Component {
  state = {
    hasMapPermission: false,
    // userLatitud: 0,
    // userLongitude: 0
  };

  componentDidMount() {
    this.requestFineLocation();
    // this.locationWatchId = navigator.geolocation.watchPosition(
    //   pos => {
    //     this.setState({
    //       userLatitud: pos.coords.latitude,
    //       userLongitude: pos.coords.longitude
    //     });
    //   },
    //   err => console.warn(err),
    //   {
    //     enableHighAccuracy: true
    //   }
    // );
  }

  // componentWillUnmount() {
  //   navigator.geolocation.clearWatch(this.locationWatchId);
  // }

  async requestFineLocation() {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.granted) {
          this.setState({ hasMapPermission: true });
        }
      } else {
        this.setState({ hasMapPermission: true });
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <MapView
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
        style={styles.map}
        region={{
          latitude: 20.868933,
          longitude: -105.439972,
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
