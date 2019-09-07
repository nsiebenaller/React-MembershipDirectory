import React, { useState } from 'react';
import './Profile.css';
import {
  Person,
  KeyboardArrowDown,
  KeyboardArrowUp,
  ExitToApp,
  Settings,
} from '@material-ui/icons';

export default function Profile(props) {

  const [open, setOpen] = useState(false);
  const click = () => setOpen(!open);

  return(
    <div className="profile-container">
      <div
        className="profile"
        style={open ? ({ border: '1px solid #6f52ed' }) : null}
        onClick={click}
      >
        <Person className="profile-icon" />
        <div className="profile-name">{props.user.username}</div>
        {
          (open) ?
          (<KeyboardArrowUp className="profile-more-icon" />) :
          (<KeyboardArrowDown className="profile-more-icon" />)
        }

      </div>
      <div className={`profile-options ${open ? 'profile-options-open' : ''}`}>
        <div className={`profile-opt`}>
          <div className="opt-btn"><Settings />SETTINGS</div>
        </div>
        <div className={`profile-opt`}>
          <div className="opt-btn"><ExitToApp />LOGOUT</div>
        </div>
      </div>
    </div>
  )
}
