import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { reducer as form } from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import functionPrimary from './sagas/Sagas';
import CONSTANTS from './CONSTANTS';

// -----------------------------------------------------------
//          Reducer: cambio de la ruta de navegacion
//     entre las rutas autenticadas y las no autenticadas
// -----------------------------------------------------------
const reducerSession = (state = null, action) => {
  console.log("Se ejecuto reducerSession");
  switch (action.type) {
    case CONSTANTS.SET_SESSION:
      return (state = true);
    case CONSTANTS.LOGOUT:
      return (state = false);
    default:
      return state;
  }
};

// -----------------------------------------------------------
//       Reducer: Pasar las coordenadas de Polyline para
//     mostrar la ruta personalizada del componente map.js
// -----------------------------------------------------------
const reducerPolylineCoords = (state = [], action) => {
  switch (action.type) {
    case CONSTANTS.ROUTE_COORDS:
      return action.coords;
    case CONSTANTS.WIPE_ROUTE:
      return (state = []);
    default:
      return state;
  }
};

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  reducerSession,
  reducerPolylineCoords,
  form,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(functionPrimary);

export default store;
