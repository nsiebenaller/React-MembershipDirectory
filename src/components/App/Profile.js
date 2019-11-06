import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import './Profile.css';
import {
  Person,
  KeyboardArrowDown,
  KeyboardArrowUp,
  ExitToApp,
  Settings,
} from '@material-ui/icons';
import { logout } from '../../actions/userActions.js';

function Profile({ user, history, logout}) {

  const self = useRef(null);

  const [open, setOpen] = useState(false);
  const click = () => setOpen(!open);

  useEffect(() => {
    const closeIfOpen = (e) =>
      (self && !self.current.contains(e.target) && open) ?
      setOpen(false) : (null);
    window.addEventListener('click', closeIfOpen)
    return () => window.removeEventListener('click', closeIfOpen)
  }, [open]);

  const navigateToSettings = () => history.push("/app/settings");

  return(
    <div className="profile-container" ref={self}>
      <div
        className="profile"
        style={open ? ({ border: '1px solid #6f52ed' }) : null}
        onClick={click}
      >
        <Person className="profile-icon" />
        <div className="profile-name">{user.username}</div>
        {
          (open) ?
          (<KeyboardArrowUp className="profile-more-icon" />) :
          (<KeyboardArrowDown className="profile-more-icon" />)
        }

      </div>
      <div className={`profile-options ${open ? 'profile-options-open' : ''}`}>
        <div className={`profile-opt`}>
          <div className="opt-btn" onClick={navigateToSettings}><Settings />SETTINGS</div>
        </div>
        <div className={`profile-opt`}>
          <div
            className="opt-btn"
            onClick={logout(history)}
          ><ExitToApp />LOGOUT</div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return({ })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: (history) => (e) => dispatch(logout(history)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
