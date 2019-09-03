import CONSTANTS from '../CONSTANTS';

export default function DataActivities(state = {}, action) {
  console.log(action.data);
  switch (action.type) {
    case CONSTANTS.SHOW_DATA_ACTIVITIES:
      return action.data;
    default:
      return state;
  }
}
