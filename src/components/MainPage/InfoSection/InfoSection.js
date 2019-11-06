import React from 'react';
import {
  Paper,
} from '@material-ui/core';
import './InfoSection.css';

export default function InfoSection({ infoOpen }) {

  const style = {
    width: infoOpen ? '400px' : '0px',
    margin: infoOpen ? '30px 60px 60px 15px' : '30px 0px 60px 0px'
  }

  return(
    <Paper className="info-section" style={style}>
      <div>hello world</div>
    </Paper>
  )
}
