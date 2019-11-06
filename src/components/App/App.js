import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import { storeUser } from '../../actions/userActions.js';
import Header from './Header.js';
import SideBar from './SideBar.js';
import Main from '../MainPage/Main.js';
import NewMember from '../NewMember/NewMember.js';
import EditMember from '../NewMember/EditMember.js';
import Settings from '../Settings/Settings.js';
import tryAutologin from '../../helpers/autoLogin.js';

function isAuthenticated(user) {
  return!!(user.id && user.username)
}

function App({ history, user, storeUser }) {

  useEffect(() => {
    async function doAccessFilter() {
      const resp = await tryAutologin();
      if(resp.success) storeUser(resp.user);
      else history.push('/');
    }
    if(!isAuthenticated(user)) doAccessFilter();
  }, [history, user, storeUser])

  if(!isAuthenticated(user)) {
    return(
      <div className="app">Loading...</div>
    )
  }

  return(
    <div className="app">
      <SideBar history={history} />
      <Header user={user} history={history} />
      <div>
        <Route path="/app" exact component={Main} />
        <Route path="/app/new_member" exact component={NewMember} />
        <Route path="/app/edit_member" exact component={EditMember} />
        <Route path="/app/settings" exact component={Settings} />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return({ user: state.user })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  storeUser: (user) => dispatch(storeUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
