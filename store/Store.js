/* eslint-disable prettier/prettier */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as form } from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import functionPrimary from './sagas/Sagas';
import CONSTANTS from './CONSTANTS';

// const initialState = { isLoggedIn: false };

const reducerSession = (state = null, action) => {
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

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(functionPrimary);

export default store;
