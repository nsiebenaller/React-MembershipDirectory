import axios from 'axios';

export function storeMembers(members) {
  return {
    type: 'STORE_MEMBERS',
    payload: members
  }
}

export function getAllMembers() {
  return async (dispatch) => {
    try {
      const resp = await axios.get('/api/members')
      dispatch(storeMembers(resp.data))
      return { success: true }
    }
    catch(e) {
      return { success: false }
    }
  }
}
