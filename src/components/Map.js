import React, { Component } from 'react';
import { View, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import MapView  from 'react-native-maps';

class Map extends Component {
  state = {
    hasMapPermission: false,
    // userLatitud: 0,
    // userLongitude: 0
  };

  componentDidMount() {
    this.requestFineLocation();
    // navigator.geolocation.watchPosition(
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
    // )
  }

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
      <View style={styles.container}>
        <MapView
          showsUserLocation
          followsUserLocation
          style={styles.map}
          region={{
            latitude: 20.868933,
            longitude: -105.439972,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingHorizontal: 16,
      backgroundColor: '#FFFFFF',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });

export default Map;
