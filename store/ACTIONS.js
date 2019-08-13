import CONSTANTS from './CONSTANTS';

export const actionRegistry = values => ({
  type: CONSTANTS.REGISTRY,
  datos: values,
});

export const actionLogin = datos => ({
  type: CONSTANTS.LOGIN,
  datos,
});

export const actionSetSession = () => ({
  type: CONSTANTS.SET_SESSION,
});

export const actionLogout = user => ({
  type: CONSTANTS.LOGOUT,
  user,
});

export const actionUserLocation = () => ({
  type: CONSTANTS.USER_LOCATION,
});
