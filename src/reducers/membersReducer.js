import createReducer from '../helpers/createReducer';

const init = [];

const membersReducer = createReducer(init, {
  'STORE_MEMBERS': (state, action) => action.payload
});

export default membersReducer;
