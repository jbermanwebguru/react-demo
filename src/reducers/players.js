import {
  PLAYERS_LOADED,
  ADD_PLAYER
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case PLAYERS_LOADED:
      return {
        ...state,
        players: action.payload.players,
        errors: action.error ? [action.payload.error] : null
      };
    case ADD_PLAYER:
      return {
        ...state,
        redirectTo: action.error ? null : '/roster',
        errors: action.error ? [action.payload.error] : null
      }
    default:
      return state;
  }
};
