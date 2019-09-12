import React from 'react';
import { Typography, Select, MenuItem, OutlinedInput } from '@material-ui/core';
import { States } from '../../static/States.json';
import './StateDropdown.css';

export default function StateDropdown({ label, value, setState }) {
  return(
    <div className="state-dropdown">
      <Typography component="b">{label}</Typography>
      <Select
          value={value}
          onChange={setState('state')}
          input={<OutlinedInput labelWidth={0} />}
          MenuProps={{style: { height: 500 }}}
        >
        {
          States.map((state, idx) => (
            <MenuItem key={`state-${idx}`} value={state.abbreviation}>{state.abbreviation} - {state.name}</MenuItem>
          ))
        }
        </Select>
    </div>
  )
}
