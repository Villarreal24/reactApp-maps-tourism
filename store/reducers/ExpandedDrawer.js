import CONSTANTS from '../CONSTANTS';

// -----------------------------------------------------------
//      Comunicacion del elemento presionado de la lista
//        de lugares del DrawerBottom para mostrar el
//                    nuevo componente.
// -----------------------------------------------------------
export default function ExpandedDrawer(state = {}, action) {
  switch (action.type) {
    case CONSTANTS.SET_EXPANDED_DRAWER:
      return action.data;
    default:
      return state;
  }
}
