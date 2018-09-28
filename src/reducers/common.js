import {
  APP_LOAD,
  REDIRECT,
  LOGOUT,
  LOGIN,
  REGISTER,
  PLAYERS_LOADED,
  ADD_PLAYER,
  DELETE_PLAYER
} from '../constants/actionTypes';

const defaultState = {
  appName: 'Conduit',
  token: null,
  viewChangeCounter: 0
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.user : null
      };
    case REDIRECT:
      return { ...state, redirectTo: null };
    case LOGOUT:
      return { ...state, redirectTo: '/', token: null, currentUser: null };
    case LOGIN:
    case REGISTER:
      return {
        ...state,
        redirectTo: action.error ? null : '/roster',
        token: action.error ? null : action.payload.token,
        currentUser: action.error ? null : action.payload.user
      };
    case PLAYERS_LOADED:
      return {
        ...state,
        inProgress: false,
        players: action.payload.players,
        errors: action.error ? [action.payload.error] : null
      };
    case ADD_PLAYER:
    case DELETE_PLAYER:
      return {
        ...state,
        inProgress: false,
        redirectTo: action.error ? null : '/roster',
        errors: action.error ? [action.payload.error] : null
        }
    default:
      return state;
  }
};
