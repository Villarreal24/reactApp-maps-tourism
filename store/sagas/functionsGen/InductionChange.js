import { Alert } from "react-native";
import { call } from "redux-saga/effects";
import { authentication, db } from "../../Services/Firebase";
import * as NavigationService from "../../../src/navigation/NavigationService.js";

const changeInduction = () => {
  const user = authentication.currentUser;
  console.log(user.uid);
  db.collection('users')
    .doc(user.uid)
    .update({
      selectInduction: true
    });
};

export default function* SagaChangeInduction() {
  try {
    yield call(changeInduction);
    NavigationService.navigate('Home');
  } catch (error) {
    console.log(error);
    Alert.alert("Problema al iniciar sesion!", "Revise su conexion a internet");
  }
}
