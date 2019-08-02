import CONSTANTS from './CONSTANTS';

export const actionRegistry = values => ({
  type: CONSTANTS.REGISTRY,
  datos: values,
});

export const actionLogin = datos => ({
  type: CONSTANTS.LOGIN,
  datos,
});

export const actionSetSession = LoggedIn => ({
  type: CONSTANTS.SET_SESSION,
  LoggedIn,
});

export const actionLogout = LoggedIn => ({
  type: CONSTANTS.LOGOUT,
  LoggedIn,
});
