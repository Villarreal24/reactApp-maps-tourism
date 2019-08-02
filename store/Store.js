import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as form } from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import functionPrimary from './sagas/Sagas';
import CONSTANTS from './CONSTANTS';

const reducerSession = (state = {}, action) => {
  console.log('Se ejecuto reducerSession');
  switch (action.type) {
    case CONSTANTS.SET_SESSION:
      return true;
    case CONSTANTS.LOGOUT:
      return false;
    default:
      return state;
  }
};

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  reducerSession,
  form,
});

const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(reducers, devTools, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(functionPrimary);

export default store;
