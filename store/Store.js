import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reducer as reduxForm } from 'redux-form';
import functionPrimary from './sagas/Sagas';
import InitialSession from './reducers/InitialSession';
import ExpandedDrawer from './reducers/ExpandedDrawer';
import PolylineCoords from './reducers/PolylineCoords';
import DataActivities from './reducers/DataActivities';

const sagaMiddleware = createSagaMiddleware();

/*eslint-disable */
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
/*eslint-disable */

const rootReducer = combineReducers({
  InitialSession,
  ExpandedDrawer,
  PolylineCoords,
  DataActivities,
  form: reduxForm
});

const store = createStore(
  rootReducer,
  composeSetup(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(functionPrimary);

export default store;
