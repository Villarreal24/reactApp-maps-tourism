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
      selectInduction: false
    });

function* sagaRegistry(values) {
  try {
    const registry = yield call(registryUserNew, values.datos);
    const {
      user: { email, uid }
    } = registry;
    const {
      datos: { name }
    } = values;
    yield call(registryInDataBase, { uid, email, name });
    ToastAndroid.show("Registro exitoso !", ToastAndroid.SHORT);
    NavigationService.navigate('SignIn');
  } catch (error) {
    if (error.code === "auth/network-request-failed") {
      Alert.alert("Problema al Registrarse!", "Revise su conexion a internet");
    } else if (error.code === "auth/email-already-in-use") {
      Alert.alert("Problema al registrarse!", "El email ingresado ya existe");
    }
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

// -----------------------------------------------------------
//          Valida si el usuario ya ha iniciado sesion
//         anteriormente para mandarlo a las pantallas
//        de seleccion de intereses o del menu principal
// -----------------------------------------------------------
const screensInterest = uid => {
  const interestRef = db.collection("users").doc(uid);
  const getDoc = interestRef.get().then(doc => doc.data());
  getDoc.then(value => {
    if (value.selectInduction === true) {
      NavigationService.navigate('App');
    } else {
      NavigationService.navigate('Interest');
    }
  });
};

function* sagaLogin(values) {
  try {
    const login = yield call(loginUser, values.datos);
    const uid = login.user.uid;
    yield call(screensInterest, uid);
  } catch (error) {
    console.log(error);
    if (error.code === "auth/network-request-failed") {
      Alert.alert(
        "Problema al iniciar sesion!",
        "Revise su conexion a internet"
      );
    } else if (error.code === "auth/wrong-password") {
      Alert.alert(
        "Problema al iniciar sesion!",
        "Lo siento, correo y/o contraseña incorrectos"
      );
    }
  }
}

// -------------------------------------------------------
//             Cierra la sesion del usuario
// -------------------------------------------------------
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

const changeInduction = () => {
  const user = authentication.currentUser;
  console.log(user.uid);
  db.collection('users')
    .doc(user.uid)
    .update({
      selectInduction: true
    });
};

function* sagaChangeInduction() {
  try {
    yield call(changeInduction);
    NavigationService.navigate('Home');
  } catch (error) {
    console.log(error);
    Alert.alert("Problema al iniciar sesion!", "Revise su conexion a internet");
  }
}

// -----------------------------------------------------------
//            Llamando a las funciones generadoras
// -----------------------------------------------------------
export default function* functionPrimary() {
  yield takeEvery(CONSTANTS.REGISTRY, sagaRegistry);
  yield takeEvery(CONSTANTS.LOGIN, sagaLogin);
  yield takeEvery(CONSTANTS.SIGNOUT, sagaSignOut);
  yield takeEvery(CONSTANTS.USER_LOCATION, sagaLocation);
  yield takeEvery(CONSTANTS.CHANGE_INDUCTION, sagaChangeInduction);
}
