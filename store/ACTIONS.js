import CONSTANTS from './CONSTANTS';

export const actionRegistry = values => ({
  type: CONSTANTS.REGISTRY,
  datos: values
});

export const actionLogin = datos => ({
  type: CONSTANTS.LOGIN,
  datos
});

export const actionSignOut = () => ({
  type: CONSTANTS.SIGNOUT
});

export const actionSetSession = () => ({
  type: CONSTANTS.SET_SESSION
});

export const actionLogout = () => ({
  type: CONSTANTS.LOGOUT
});

export const actionUserLocation = () => ({
  type: CONSTANTS.USER_LOCATION
});

export const actionRouteCoords = coords => ({
  type: CONSTANTS.ROUTE_COORDS,
  coords
});

export const actionWipeRoute = () => ({
  type: CONSTANTS.WIPE_ROUTE
});

export const actionSetExpandedDrawer = data => ({
  type: CONSTANTS.SET_EXPANDED_DRAWER,
  data
});

export const actionChangeInduction = () => ({
  type: CONSTANTS.CHANGE_INDUCTION
});

export const actionGetDataActivities = () => ({
  type: CONSTANTS.GET_DATA_ACTIVITIES
});

export const actionShowDataActivities = () => ({
  type: CONSTANTS.SHOW_DATA_ACTIVITIES,
});
