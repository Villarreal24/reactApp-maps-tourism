import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  PermissionsAndroid,
  Platform,
  Alert,
  StatusBar,
  isAndroid
} from "react-native";
import Geolocation from "@react-native-community/geolocation";
import Axios from 'axios';
import { connect } from "react-redux";
import { actionUserLocation } from "../../../store/ACTIONS";
import Map from "../../components/map/Map";
import DrawerBottom from "../../components/DrawerBottom";

const HeightBar = StatusBar.currentHeight;

class Home extends React.Component {
  static navigationOptions = {
    header: null,
    headerStyle: {
      marginTop: HeightBar,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0
    }
  };

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
      regionUser: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121
      }
    };
    this.locationWatchId = null;
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  // ------------------------------------------------------
  //           Se ejecuta a funcion de permisos
  //            de geolocalizacion del usuario
  // ------------------------------------------------------
  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      isAndroid && StatusBar.setBackgroundColor('#6a51ae');
    });
    this.requestFineLocation();
  }

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
          regionUser: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }
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

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.hideKeyboard}>
        <View style={styles.container}>
          <StatusBar
            translucent={true}
            backgroundColor="rgba(0,0,0, .3)"
            barStyle="light-content"
          />
          <Map
            hasMapPermission={this.state.hasMapPermission}
            region={this.state.region}
            regionUser={this.state.regionUser}
          />
          <DrawerBottom />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  lineStyle: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#DBDBDB",
    marginTop: 10,
    marginLeft: 185,
    width: 25,
    borderRadius: 10
  }
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
