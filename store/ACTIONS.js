import CONSTANTS from './CONSTANTS';

export const actionRegistry = values => ({
    type: CONSTANTS.REGISTRY,
    datos: values,
  });
  
  export const actionLogin = datos => ({
    type: CONSTANTS.LOGIN,
    datos,
  });
  
  export const actionSetSession = user => ({
    type: CONSTANTS.SET_SESSION,
    user,
  });
  
  export const actionLogout = () => ({
    type: CONSTANTS.LOGOUT,
  });
  