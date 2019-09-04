import React, { useState } from 'react';
import { Badge } from '@material-ui/core';
import {
  Person,
  Notifications,
  KeyboardArrowDown,
  KeyboardArrowUp,
  ExitToApp,
  Settings
} from '@material-ui/icons';
import './Header.css'

export default function Header(props) {

  const [open, setOpen] = useState(false);
  const click = () => setOpen(!open);
  const [frame, setFrame] = useState(0);
  const hide = () => {
    setFrame(1);
    setTimeout(() => setFrame(0), 40);
  }
  const show = () => {
    setFrame(1);
    setTimeout(() => setFrame(3), 40);
  }


  return(
    <div className="header">

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
      <div className="noti-icon-container">
        <Badge
          badgeContent={'4'}
          color="error"
          variant={frame === 0 ? "dot" : "standard"}
          invisible={frame === 1}
          onMouseEnter={show}
          onMouseLeave={hide}
          children={<Notifications className="noti-icon" />}
        />
      </div>

      <div className={`profile-extras ${open ? 'profile-extras-open' : ''}`}>
        <div className={`profile-more ${open ? 'profile-more-open' : ''}`}>
          <div className="logout-btn"><Settings className="logout-icon" />SETTINGS</div>
        </div>
        <div className={`profile-settings ${open ? 'profile-settings-open' : ''}`}>
          <div className="logout-btn"><ExitToApp className="logout-icon" />LOGOUT</div>
        </div>
      </div>
    </div>
  )
}
