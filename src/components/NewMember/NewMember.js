import React, { useState } from 'react';
import './NewMember.css';
import { TextField, Typography } from '@material-ui/core';
import { SingleDatePicker } from 'react-dates';


const defaultState = {
  first_name: '',
  last_name: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  home_phone: '',
  cell_phone: '',
  email: '',
  membership_date: '',
  status: '',
  birth_day: 0,
  birth_month: 0,
  birth_fullyear: 0,
  date: null,
  focused: false
}
export default function NewMember() {

  const [state, setValue] = useState(defaultState);
  const setState = (name) => (e) => setValue({ ...state, [name]: e.target.value });
  const setDate = (date) => setValue({
    ...state,
    date: date,
    focused: false,
    birth_day: date ? date.date() : 0,
    birth_month: date ? date.month() + 1 : 0,
    birth_fullyear: date ? date.year() : 0
  });
  const setFocused = ({ focused }) => true ? setValue({ ...state, focused: focused }) : null;

  return(
    <div className="new-member-container">
      <Typography component="b">Firstname</Typography>
      <TextField
        variant="outlined"
        value={state.first_name}
        onChange={setState('first_name')}
      />
      <Typography component="b">Lastname</Typography>
      <TextField
        variant="outlined"
        value={state.last_name}
        onChange={setState('last_name')}
      />
      <Typography component="b">Address</Typography>
      <TextField
        variant="outlined"
        value={state.address}
        onChange={setState('address')}
      />
      <Typography component="b">City</Typography>
      <TextField
        variant="outlined"
        value={state.city}
        onChange={setState('city')}
      />
      <Typography component="b">State</Typography>
      <TextField
        variant="outlined"
        value={state.state}
        onChange={setState('state')}
      />
      <Typography component="b">Zip</Typography>
      <TextField
        variant="outlined"
        value={state.zip}
        onChange={setState('zip')}
      />
      <Typography component="b">Home Phone</Typography>
      <TextField
        variant="outlined"
        value={state.home_phone}
        onChange={setState('home_phone')}
      />
      <Typography component="b">Cell Phone</Typography>
      <TextField
        variant="outlined"
        value={state.cell_phone}
        onChange={setState('cell_phone')}
      />
      <div>
        <Typography component="b">Birthday</Typography><br />
        <SingleDatePicker
          date={state.date}
          onDateChange={setDate}
          focused={state.focused}
          onFocusChange={setFocused}
          id={state.focused ? 'new-member-date--open' : 'new-member-date'}
          isOutsideRange={() => false}
          keepOpenOnDateSelect
          noBorder
        />
      </div>
    </div>
  )
}
