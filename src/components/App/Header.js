import React, { useState } from 'react';
import { Badge } from '@material-ui/core';
import {
  Notifications,
} from '@material-ui/icons';
import './Header.css';
import Profile from './Profile.js';

export default function Header({ user, history }) {

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
      <Profile
        user={user}
        history={history}
      />
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
    </div>
  )
}
