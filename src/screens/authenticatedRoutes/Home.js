import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  PermissionsAndroid,
  Platform
} from 'react-native';
import Map from '../../components/Map';
import PlaceInput from '../../components/PlaceInput';
import BarStatus from '../../components/common/BarStatus';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMapPermission: false,
      userLatitude: 20.868933,
      userLongitude: -105.439972,
    };
    this.locationWatchId = null;
  }

  componentDidMount() {
    this.requestFineLocation();
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.locationWatchId);
  }

  hideKeyboard() {
    Keyboard.dismiss();
  }
// -----------------------------------------------------
//             Obtener la posicion del usuario
// -----------------------------------------------------
  getUserPosition() {
    console.log("Entro en la funcion - GetUserPosition");
    this.setState({ hasMapPermission: true });
    this.locationWatchId = navigator.geolocation.getCurrentPosition(
      pos => {
        this.setState({
          userLatitude: pos.coords.latitude,
          userLongitude: pos.coords.longitude
        });
      },
      err => console.warn(err),
      {
        enableHighAccuracy: true
      }
    );
  }
// -----------------------------------------------------
//             Pedir acceso a los permisos de
//              la localizacion del usuario
// -----------------------------------------------------
  async requestFineLocation() {
    try {
      if (Platform.OS === 'android') {
        this.getUserPosition();
        console.log("1");
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.granted) {
          this.getUserPosition();
          console.log("1");
        }
      } else {
        this.getUserPosition();
        console.log("2");
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
    flex: 1,
  },
});

export default Home;
