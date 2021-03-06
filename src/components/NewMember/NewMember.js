import React, { useState } from 'react';
import { connect } from 'react-redux';
import './NewMember.css';
import { Typography, Paper, Button, IconButton } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import CustomTextField from './TextField.js';
import StateDropdown from './StateDropdown.js';
import MonthDropdown from './MonthDropdown.js';
import { create } from '../../actions/membersActions.js';
import { Months } from '../../static/Months.json';

const defaultState = {
  first_name: '',
  last_name: '',
  address: '',
  city: '',
  state: 'WI',
  zip: '',
  home_phone: '',
  cell_phone: '',
  email: '',
  membership_date: '',
  status: '',
  birth_day: '',
  birth_month: '',
  birth_fullyear: '',
}
function NewMember({ create, history }) {

  const [state, setValue] = useState(defaultState);
  const setState = (name) => (e) => setValue({ ...state, [name]: e.target.value });

  const setBirthMonth = (name) => (e) => {
    const birthMonth = e.target.value;
    if(birthMonth === 'None') setValue({ ...state, [name]: '' });
    else setValue({ ...state, [name]: birthMonth });
  }

  const setBirthDay = (name) => (e) => {
    const birthDay = parseInt(e.target.value);
    if(birthDay >= 1 && birthDay <= 31) setValue({ ...state, [name]: birthDay });
    if(birthDay < 1) setValue({ ...state, [name]: '' });
  }

  const clearForm = () => setValue(defaultState);

  const createMember = async () => {
    const birthMonth = Months.findIndex(month => month.name === state.month);

    const request = {
      first_name: state.first_name,
      last_name: state.last_name,
      address: state.address,
      city: state.city,
      state: state.state,
      zip: state.zip,
      home_phone: state.home_phone,
      cell_phone: state.cell_phone,
      email: state.email,
      membership_date: state.membership_date,
      status: state.status,
      birth_date: '',
      birth_year: '',
      birth_day: parseInt(state.birth_day),
      birth_month: birthMonth,
      birth_fullyear: parseInt(state.birth_fullyear)
    }
    const resp = await create(request);
    if(resp.status === 200) {
      window.alert("Member created!");
      clearForm();
    }
    else {
      window.alert("Error creating member!")
    }
  }

  const redirectToMain = () => history.push('/app');

  return(
    <Paper className="new-member-container">
      <div className="header-container">
        <IconButton onClick={redirectToMain}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4">Create Member</Typography>
      </div>
      <br />
      <div className="action-container">
        <CustomTextField
          label={'Firstname'}
          property={'first_name'}
          value={state.first_name}
          setState={setState}
        />
        <CustomTextField
          label={'Lastname'}
          property={'last_name'}
          value={state.last_name}
          setState={setState}
        />
      </div>
      <br />
      <CustomTextField
        label={'Address'}
        property={'address'}
        value={state.address}
        setState={setState}
      />
      <br />
      <div className="location-container">
        <CustomTextField
          label={'City'}
          property={'city'}
          value={state.city}
          setState={setState}
        />
        <StateDropdown
          label={'State'}
          value={state.state}
          setState={setState}
        />
        <CustomTextField
          label={'Zip'}
          property={'zip'}
          value={state.zip}
          setState={setState}
        />
      </div>
      <br />
      <div className="action-container">
        <CustomTextField
          label={'Home Phone'}
          property={'home_phone'}
          value={state.home_phone}
          setState={setState}
        />
        <CustomTextField
          label={'Cell Phone'}
          property={'cell_phone'}
          value={state.cell_phone}
          setState={setState}
        />
      </div>
      <br />
      <div className="action-container">
        <MonthDropdown
          label={'Birth Month'}
          value={state.birth_month}
          setState={setBirthMonth}
        />
        <CustomTextField
          type="number"
          label={'Birth Day'}
          property={'birth_day'}
          value={state.birth_day}
          setState={setBirthDay}
        />
        <CustomTextField
          type="number"
          label={'Birth Year'}
          property={'birth_fullyear'}
          value={state.birth_fullyear}
          setState={setState}
        />
      </div>
      <br />
      <CustomTextField
        label={'Email'}
        property={'email'}
        value={state.email}
        setState={setState}
      />
      <br />
      <div className="save-container">
        <Button
          className="save-btn"
          color="primary"
          variant="contained"
          onClick={createMember}
        >Save Member</Button>
      </div>
    </Paper>
  )
}


const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch, ownProps) => ({
  create: (member) => dispatch(create(member))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewMember)
