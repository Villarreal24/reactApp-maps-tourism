import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as form } from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import functionPrimary from './sagas/Sagas';
import CONSTANTS from './CONSTANTS';

const reducerPrueba = (state = [0], action) => {
    switch (action.type) {
        case 'AUMENTAR':
            return [...state, 1];
        default:
            return state;
    }
};

// const reducerSession = (state = null, action) => {
//     switch (action.type) {
//       case CONSTANTS.SET_SESSION:
//         return action.user;
//       case CONSTANTS.LOGOUT:
//         return null;
//       default:
//         return state;
//     }
//   };

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
    // reducerSession,
    reducerPrueba,
    form,
});

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(functionPrimary);

export default store;
