import createReducer from '../helpers/createReducer';

const init = {};

const selectedMemberReducer = createReducer(init, {
  'SELECTED_MEMBER': (state, action) => action.payload
});

export default selectedMemberReducer;
