import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  PermissionsAndroid,
  Platform,
  Alert,
} from "react-native";
import Geolocation from "@react-native-community/geolocation";
import Axios from 'axios';
import { connect } from "react-redux";
import Map from "../../components/map/Map";
import BarStatus from "../../components/common/BarStatus";
import { actionUserLocation } from "../../../store/ACTIONS";
import DrawerBottom from "../../components/map/DrawerBottom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMapPermission: false,
      region: {
        latitude: 20.868441,
        longitude: -105.441136,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121
      },
      TempLatitude: 0,
      TempLongitude: 0,
      showAlert: true,
    };
    this.locationWatchId = null;
  }

  // ------------------------------------------------------
  //           Se ejecuta a funcion de permisos
  //            de geolocalizacion del usuario
  // ------------------------------------------------------
  componentDidMount() {
    this.requestFineLocation();
  }

  // componentWillUnmount() {
  //   navigator.geolocation.clearWatch(this.locationWatchId);
  // }

  hideKeyboard() {
    Keyboard.dismiss();
  }

  // -------------------------------------------------------
  //         Obtiene la posicion actual del usuario
  // -------------------------------------------------------
  async getUserPosition() {
    this.setState({ hasMapPermission: true });
    Geolocation.getCurrentPosition(
      async pos => {
        this.setState({
          TempLatitude: pos.coords.latitude,
          TempLongitude: pos.coords.longitude
        });
        const userCity = await this.getCity(userCity);
        console.log(userCity);
      },
      err => console.warn(err),
      {
        enableHighAccuracy: true
      }
    );
  }

  // --------------------------------------------------------------
  //         Reverse Geocoding (Por medio de lat & lon)
  //           obtener la ciudad y pais del usuario
  //                           +
  //      Validar si se encuentra en Sayulita, para realizar
  //      en renderizado del mapa en sayulita o en el usuario
  // --------------------------------------------------------------
  async getCity(userCity) {
    const { TempLatitude, TempLongitude } = this.state;
    console.log(TempLatitude, TempLongitude);
    const result = await Axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${TempLatitude},${TempLongitude}&key=AIzaSyDGJWTDnaUpLl02VFsQmcNECQ_8gvuoQcY`
    );
    userCity = result.data.results[4].formatted_address;
    if (userCity === 'Sayulita, Nayarit, Mexico') {
      this.setState({
        latitude: TempLatitude,
        longitude: TempLongitude
      });
    } else {
      Alert.alert(
        "No se encuentra en Sayulita!",
        "No tendra los beneficios de trazar rutas y obtener recomendaciones, porque se encuentra en otra ciudad..."
      );
    }
    // console.log(result);
    // console.log(userCity);
    return userCity;
  }

  // --------------------------------------------------------
  //              Pedir acceso a los permisos de
  //               la geolocalizacion al usuario
  // --------------------------------------------------------
  async requestFineLocation() {
    try {
      if (Platform.OS === 'android') {
        const { granted } = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.granted) {
          await this.getUserPosition();
          this.setState({ hasMapPermission: true });
          // this.locationUser();
        }
      } else {
        await this.getUserPosition();
        // this.locationUser();
      }
    } catch (err) {
      console.log(err);
    }
  }

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.hideKeyboard}>
        <View style={styles.container}>
          <Map
            hasMapPermission={this.state.hasMapPermission}
            region={this.state.region}
          />
          <DrawerBottom />
          <BarStatus />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lineStyle: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#DBDBDB",
    marginTop: 10,
    marginLeft: 185,
    width: 25,
    borderRadius: 10,
  },
});

// const mapStateToProps = state => {
//   state;
// };

// const mapDispatchToProps = dispatch => ({
//   locationUser: () => {
//     dispatch(actionUserLocation(this.state));
//   },
// });

export default Home;
// export default connect(
//   // mapStateToProps,
//   mapDispatchToProps
// )(Home);
