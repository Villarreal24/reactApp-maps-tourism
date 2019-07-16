/* eslint-disable prettier/prettier */
import { takeEvery, call, put } from 'redux-saga/effects';
import { authentication, db} from '../Services/Firebase';
import CONSTANTS from '../CONSTANTS';
import { NavigationActions } from 'react-navigation';

const registryUserNew = (values) =>
    authentication
        .createUserWithEmailAndPassword(values.email, values.password)
        .then(success => success);
        
const registryInDataBase = ({ uid, email, name }) => 
    db.collection('users').doc(uid).set({
        user: name,
        email: email,
    });

function* sagaRegistry(values) {
    try {
        const registry = yield call(registryUserNew, values.datos);
        const { user: { email, uid }} = registry
        const { datos: { name } } = values;
        yield call(registryInDataBase, { uid, email, name });
    } catch (error) {
        console.log(error);
    }
}

const loginUser = ({email, password}) => 
    authentication.signInWithEmailAndPassword(email, password)
    .then(success => success);

function* sagaLogin(values) {
    try {
        console.log(values);
        const result = yield call(loginUser, values.datos);
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

// function* sagaSesion(user) {
//     console.log( yield put(NavigationActions.navigate({ routeName: 'App' })));
//     console.log(user);
// }

export default function* functionPrimary() {
    yield takeEvery(CONSTANTS.REGISTRY, sagaRegistry);
    yield takeEvery(CONSTANTS.LOGIN, sagaLogin);
    // yield takeEvery(CONSTANTS.SET_SESSION, sagaSesion);
    console.log('Desde nuestra funcion generadora');
}
