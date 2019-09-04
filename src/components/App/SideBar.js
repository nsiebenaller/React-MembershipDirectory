import React from 'react';
import './SideBar.css';
import { HourglassEmpty } from '@material-ui/icons'

export default function SideBar(props) {

  return(
    <div className="sidebar">
      <div className="sidebar-icon-container">
        <HourglassEmpty className="sidebar-icon" />
      </div>
    </div>
  )
}
