import { combineReducers } from 'redux';
import userReducer from './userReducer.js';
import membersReducer from './membersReducer.js';
import selectedMemberReducer from './selectedMemberReducer.js';

export default combineReducers({
  user: userReducer,
  members: membersReducer,
  selectedMember: selectedMemberReducer,
})
