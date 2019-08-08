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

export const actionLogout = () => ({
  type: CONSTANTS.LOGOUT,
});

export const actionUserLocation = (values) => ({
  type: CONSTANTS.USER_LOCATION,
  values,
});
