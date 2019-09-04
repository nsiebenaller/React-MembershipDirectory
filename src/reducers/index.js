import { combineReducers } from 'redux';
import userReducer from './userReducer.js';
import membersReducer from './membersReducer.js';

export default combineReducers({
  user: userReducer,
  members: membersReducer
})
