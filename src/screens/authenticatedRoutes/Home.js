import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Permissions,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Map from '../../components/map/Map';
import PlaceInput from '../../components/map/PlaceInput';
import BarStatus from '../../components/common/BarStatus';

const locations = require('../../components/map/locations.json');

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMapPermission: false,
      userLatitude: 20.868933,
      userLongitude: -105.439972,
      locations: locations
    };
    this.locationWatchId = null;
  }

  // ------------------------------------------------------
  //           Se ejecuta a funcion de permisos
  //            de geolocalizacion del usuario
  // ------------------------------------------------------
  componentDidMount() {
    this.requestFineLocation();

    // const {
    //   locations: [sampleLocation]
    // } = this.state;
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.locationWatchId);
  }

  hideKeyboard() {
    Keyboard.dismiss();
  }
  // ------------------------------------------------------
  //         Obtiene la posicion actual del usuario
  // ------------------------------------------------------
  getUserPosition() {
    console.log("Entro en la funcion - GetUserPosition");
    this.setState({ hasMapPermission: true });
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.setState({
          userLatitude: pos.coords.latitude,
          userLongitude: pos.coords.longitude,
        });
      },
      err => console.warn(err),
      {
        enableHighAccuracy: true,
      }
    );
  }
  // -----------------------------------------------------
  //             Pedir acceso a los permisos de
  //              la geolocalizacion al usuario
  // -----------------------------------------------------
  async requestFineLocation() {
    // const { status } = await Permissions.getAsync(Permissions.LOCATION);
    try {
      // if (status === 'granted') {
      //   const response = await Permissions.askAsync(Permissions.LOCATION);
      // }
      if (Platform.OS === "android") {
        const { granted } = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted == PermissionsAndroid.RESULTS.granted) {
          this.getUserPosition();
        }
      } else {
        this.getUserPosition();
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.hideKeyboard}>
        <View style={styles.container}>
          <BarStatus />
          <Map
            locations={this.state.locations}
            userLatitude={this.state.userLatitude}
            userLongitude={this.state.userLongitude}
          />
          <PlaceInput />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Home;
