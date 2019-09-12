import React from 'react';
import { Typography, TextField } from '@material-ui/core';
import './TextField.css';

export default function CustomTextField({ label, property, value, setState, type = "text" }) {
  return(
    <div className="textfield">
      <Typography component="b">{label}</Typography>
      <TextField
        type={type}
        variant="outlined"
        value={value}
        onChange={setState(property)}
      />
    </div>
  )
}
