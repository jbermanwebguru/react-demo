import {
  PLAYERS_LOADED,
  ADD_PLAYER,
  DELETE_PLAYER,
  ASYNC_START
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case PLAYERS_LOADED:
      return {
        ...state,
        inProgress: false,
        players: action.payload.players,
        errors: action.error ? [action.payload.error] : null
      };
    case ADD_PLAYER:
      return {
        ...state,
        inProgress: false,
        redirectTo: action.error ? null : '/roster',
        errors: action.error ? [action.payload.error] : null
      };
    case DELETE_PLAYER:
      const playerId = action.playerId
      return {
        ...state,
        players: state.players.filter(players => players.id !== playerId),
        inProgress: false,
        errors: action.error ? [action.payload.error] : null
      };
    default:
      return state;
  }
};
