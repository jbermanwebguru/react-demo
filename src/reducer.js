import { combineReducers } from 'redux';
import auth from './reducers/auth';
import common from './reducers/common';
import players from './reducers/players';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  auth,
  common,
  players,
  router: routerReducer
});
