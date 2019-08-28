import CONSTANTS from '../CONSTANTS';

// -----------------------------------------------------------
//          Reducer: Manda la ruta de navegacion
//     entre las rutas autenticadas y las no autenticadas
//        dependiendo si ya existe una sesion inciada.
// -----------------------------------------------------------
export default function InitialSession(state = null, action) {
  switch (action.type) {
    case CONSTANTS.SET_SESSION:
      return (state = true);
    case CONSTANTS.LOGOUT:
      return (state = false);
    default:
      return state;
  }
}
