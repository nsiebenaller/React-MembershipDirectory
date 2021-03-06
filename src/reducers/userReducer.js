import createReducer from '../helpers/createReducer';

const init = {
  id: -1,
  username: ''
};

const userReducer = createReducer(init, {
  'STORE_USER': (state, action) =>  {
    return Object.assign({}, action.payload)
  }
});

export default userReducer;
