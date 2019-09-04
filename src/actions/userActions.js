import axios from 'axios';

export function storeUser(user) {
  return {
    type: 'STORE_USER',
    payload: user
  }
}

export function login(username = null, password = null) {
  return axios.get(
    '/api/login',
    {
      headers: {
        username: username,
        password: password
      }
    }
  )
}

export function logout(history) {
  return async (dispatch) => {
    try { await axios.get('/api/logout') }
    catch(e) { console.log(e) }
    history.push('/')
    dispatch(storeUser({}))
  }
}

export function checkAuthenticated() {
  return axios.get('/api/ping')
}
