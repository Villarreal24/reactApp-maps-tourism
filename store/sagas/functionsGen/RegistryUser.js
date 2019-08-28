import { Alert, ToastAndroid } from 'react-native';
import { call } from 'redux-saga/effects';
import { authentication, db } from '../../Services/Firebase';
import * as NavigationService from "../../../src/navigation/NavigationService.js";

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

export default function* SagaRegistry(values) {
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
