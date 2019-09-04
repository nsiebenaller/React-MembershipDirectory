import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import {
  logout
} from '../../actions/userActions.js';
import Header from './Header.js';
import SideBar from './SideBar.js';
import Main from '../MainPage/Main.js';

function isAuthenticated(user) {
  return!!(user.id && user.username)
}

function App(props) {

  if(!isAuthenticated(props.user)) {
    props.history.push('/')
    return null
  }

  return(
    <div className="app">
      <SideBar />
      <Header user={props.user} />
      <Main />
    </div>
  )
}

/*
<div
  onClick={props.logout(props.history)}
>LOGOUT</div>
*/

const mapStateToProps = (state) => ({ user: state.user })

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: (history) => (e) => dispatch(logout(history))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
