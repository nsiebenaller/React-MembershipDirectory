import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Typography, Paper, Button, IconButton } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import '../NewMember/NewMember.css';
import CustomTextField from '../NewMember/TextField.js';
import StateDropdown from '../NewMember/StateDropdown.js';
import MonthDropdown from '../NewMember/MonthDropdown.js';
import { Months } from '../../static/Months.json';
import { update } from '../../actions/membersActions.js';

function EditMember({ selectedMember, history, update }) {

  const [state, setValue] = useState({});
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

  useEffect(() => {
    const birthMonth = selectedMember.birth_month ? Months[selectedMember.birth_month] : Months[0];
    if(selectedMember) setValue({ ...selectedMember, birth_month: birthMonth ? birthMonth.name : 'None' });
  }, [selectedMember])

  const redirectToMain = () => history.push('/app');

  const saveMember = async () => {
    const birthMonth = Months.findIndex(month => month.name === state.month);

    const request = {
      id: state.id,
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
    const resp = await update(request);
    if(resp.status === 200) {
      window.alert("Member saved!");
    }
    else {
      window.alert("Error saving member!")
    }
  }

  if(!state.first_name) return(
    <Paper className="new-member-container">
      <div className="header-container">
        <IconButton onClick={redirectToMain}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4">Edit Member</Typography>
      </div>
      <div>member not found.</div>
    </Paper>
  )

  return(
    <Paper className="new-member-container">
      <div className="header-container">
        <IconButton onClick={redirectToMain}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4">Edit Member</Typography>
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
          onClick={saveMember}
        >Save Member</Button>
      </div>
    </Paper>
  )
}

const mapStateToProps = (state) => ({
  selectedMember: state.selectedMember
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  update: (member) => dispatch(update(member))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditMember)
