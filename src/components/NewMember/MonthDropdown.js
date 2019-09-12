import React from 'react';
import { Typography, Select, MenuItem, OutlinedInput } from '@material-ui/core';
import { Months } from '../../static/Months.json';
import './MonthDropdown.css';


export default function MonthDropdown({ label, value, setState }) {
  return(
    <div className="month-dropdown">
      <Typography component="b">{label}</Typography>
      <Select
          value={value}
          onChange={setState('birth_month')}
          input={<OutlinedInput labelWidth={0} />}
          MenuProps={{style: { height: 500 }}}
        >
        {
          Months.map((state, idx) => (
            <MenuItem key={`month-${idx}`} value={state.name}>{state.name}</MenuItem>
          ))
        }
        </Select>
    </div>
  )
}
