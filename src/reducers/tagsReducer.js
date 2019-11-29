import createReducer from '../helpers/createReducer';

const init = [];

const tagsReducer = createReducer(init, {
  'STORE_TAGS': (state, action) => action.payload
});

export default tagsReducer;
