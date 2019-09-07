import { checkAuthenticated } from '../actions/userActions.js';

export default async function tryAutoLogin() {
  try {
    const resp = await checkAuthenticated();
    if(resp.status === 200) {
      return({
        success: true,
        user: resp.data
      })
    }
    return({
      success: false,
      user: {}
    })
  }
  catch(e) {
    console.log("err", e);
    return({
      success: false,
      user: {}
    })
  }
}
