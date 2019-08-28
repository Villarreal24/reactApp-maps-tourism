import { Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { takeEvery, call } from 'redux-saga/effects';
import { authentication, db } from '../Services/Firebase';
import * as NavigationService from "../../src/navigation/NavigationService.js";
import CONSTANTS from '../CONSTANTS';
import SagaLogin from './functionsGen/LoginUser';
import SagaRegistry from './functionsGen/RegistryUser';
import SagaChangeInduction from './functionsGen/InductionChange';
import { actionShowDataActivities } from '../ACTIONS';

// -------------------------------------------------------
//             Cierra la sesion del usuario
// -------------------------------------------------------
function* SagaSignOut() {
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

function* SagaLocation(values) {
  console.log(values);
  // yield call(getUserPosition);
}

function* SagaGetDataActivities(dispatch) {
  try {
    const activitiesRef = db
      .collection("interest")
      .doc("activities")
      .get()
      .then(doc => doc.data());
  } catch (error) {
    console.log(error);
  }
}

// -----------------------------------------------------------
//            Llamando a las funciones generadoras
// -----------------------------------------------------------
export default function* functionPrimary() {
  yield takeEvery(CONSTANTS.REGISTRY, SagaRegistry);
  yield takeEvery(CONSTANTS.LOGIN, SagaLogin);
  yield takeEvery(CONSTANTS.SIGNOUT, SagaSignOut);
  yield takeEvery(CONSTANTS.USER_LOCATION, SagaLocation);
  yield takeEvery(CONSTANTS.CHANGE_INDUCTION, SagaChangeInduction);
  yield takeEvery(CONSTANTS.GET_DATA_ACTIVITIES, SagaGetDataActivities);
}
