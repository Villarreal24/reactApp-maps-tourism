import { Alert, ToastAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { takeEvery, call } from 'redux-saga/effects';
import { authentication, db } from '../Services/Firebase';
import CONSTANTS from '../CONSTANTS';
import * as NavigationService from "../../src/navigation/NavigationService.js";

// -----------------------------------------------------------
//       Solicitud de registro de un nuevo usuario y
//     escritura en la BD con todos los datos solicitados.
// -----------------------------------------------------------
const registryUserNew = values =>
  authentication
    .createUserWithEmailAndPassword(values.email, values.password)
    .then(success => success);
const registryInDataBase = ({ uid, email, name }) =>
  db
    .collection('users')
    .doc(uid)
    .set({
      user: name,
      email: email,
    });

function* sagaRegistry(values) {
  try {
    const registry = yield call(registryUserNew, values.datos);
    const {
      user: { email, uid },
    } = registry;
    const {
      datos: { name },
    } = values;
    yield call(registryInDataBase, { uid, email, name });
    ToastAndroid.show("Registro exitoso !", ToastAndroid.SHORT);
    NavigationService.navigate('SignIn');
  } catch (error) {
    Alert.alert("Problema al registrarse!", "Revise su conexion a internet.");
    console.log(error);
  }
}

// -----------------------------------------------------------
//       Solicitud de autenticacion del inicio de sesion
// -----------------------------------------------------------
const loginUser = ({ email, password }) =>
  authentication
    .signInWithEmailAndPassword(email, password)
    .then(success => success);

function* sagaLogin(values) {
  try {
    yield call(loginUser, values.datos);
    NavigationService.navigate('App');
  } catch (error) {
    Alert.alert(
      "Problema al iniciar sesion!",
      "Lo siento, correo y/o contraseña incorrectos."
    );
    console.log(error);
  }
}

function* sagaSignOut() {
  try {
    authentication.signOut();
    NavigationService.navigate('Auth');
  } catch (error) {
    Alert.alert(
      "Problema al cerrar sesion!",
      "Lo siento, revise su conexion a internet."
    );
  }
}

// -------------------------------------------------------
//         Obtiene la posicion actual del usuario
// -------------------------------------------------------
const getUserPosition = () => {
  this.setState({ hasMapPermission: true });
  Geolocation.getCurrentPosition(
    async pos => {
      this.setState({
        TempLatitude: pos.coords.latitude,
        TempLongitude: pos.coords.longitude,
      });
      const userCity = await this.getCity(userCity);
      console.log(userCity);
    },
    err => console.warn(err),
    {
      enableHighAccuracy: true,
    }
  );
};

function* sagaLocation(values) {
  console.log(values);
  // yield call(getUserPosition);
}

// -----------------------------------------------------------
//            Llamando a las funciones generadoras
// -----------------------------------------------------------
export default function* functionPrimary() {
  yield takeEvery(CONSTANTS.REGISTRY, sagaRegistry);
  yield takeEvery(CONSTANTS.LOGIN, sagaLogin);
  yield takeEvery(CONSTANTS.SIGNOUT, sagaSignOut);
  yield takeEvery(CONSTANTS.USER_LOCATION, sagaLocation);
  console.log('Desde nuestra funcion generadora');
}
