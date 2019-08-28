import CONSTANTS from '../CONSTANTS';

// -----------------------------------------------------------
//       Reducer: Pasar las coordenadas de Polyline para
//     mostrar la ruta personalizada del componente map.js
// -----------------------------------------------------------
export default function PolylineCoords(state = [], action) {
  switch (action.type) {
    case CONSTANTS.ROUTE_COORDS:
      return action.coords;
    case CONSTANTS.WIPE_ROUTE:
      return (state = []);
    default:
      return state;
  }
}
