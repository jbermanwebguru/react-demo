import {
  LOGIN,
  REGISTER,
  ASYNC_START
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
    case REGISTER:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? [action.payload.error] : null
      };
    case ASYNC_START:
      if (action.subtype === LOGIN || action.subtype === REGISTER) {
        return { ...state, inProgress: true };
      }
      break;
    default:
      return state;
  }

  return state;
};
