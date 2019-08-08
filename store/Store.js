import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { reducer as form } from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import functionPrimary from './sagas/Sagas';
import CONSTANTS from './CONSTANTS';

// -------------------------------------------------------
//         Cambiar entre las rutas autenticadas
//               y las no autenticadas
// -------------------------------------------------------
const reducerSession = (state = {}, action) => {
  console.log('Se ejecuto reducerSession');
  switch (action.type) {
    case CONSTANTS.SET_SESSION:
      return { state: true };
    case CONSTANTS.LOGOUT:
      return { state: false };
    default:
      return state;
  }
};

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  reducerSession,
  form,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(functionPrimary);

export default store;
