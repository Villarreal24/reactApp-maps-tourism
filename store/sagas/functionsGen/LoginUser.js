import { Alert } from 'react-native';
import { call } from 'redux-saga/effects';
import { authentication, db } from '../../Services/Firebase';
import * as NavigationService from "../../../src/navigation/NavigationService";

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

export default function* SagaLogin(values) {
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
