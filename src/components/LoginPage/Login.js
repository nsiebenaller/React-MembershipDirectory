import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Paper,
  Typography,
  TextField,
  Button
} from '@material-ui/core';
import './Login.css';
import {
  login,
  storeUser,
  checkAuthenticated
} from '../../actions/userActions.js';


function LoginForm(props) {

  const [values, setValues] = useState({ username: '', password: '', error: false });
  const handleChange = (name) => (e) => setValues({ ...values, [name]: e.target.value });
  const handleLogin = async () => {
    const { username, password } = values
    let resp
    try {
      resp = await login(username, password)
    } catch(e) {
      setValues({ ...values, password: '', error: true })
      return
    }
    props.storeUser(resp.data)
    props.history.push('/app')
  }

  useEffect(() => {
    async function tryAutologin(storeUser) {
      const resp = await checkAuthenticated()
      storeUser(resp.data)
      props.history.push('/app')
    }
    tryAutologin(props.storeUser)
  }, [props.storeUser, props.history])

  return(
    <div className="App">
      <Paper className="login-container">
        <Typography variant="h4" component="h4">Fox River Directory</Typography>
        <Typography component="b" className="login-subtext">Please login to your account.</Typography>
        {
          values.error &&
          <Typography component="div" className="login-error">The username or password is incorrect.</Typography>
        }
        <Typography component="div" className="login-label">Username</Typography>
        <TextField
          variant="outlined"
          fullWidth
          value={values.username}
          onChange={handleChange('username')}
          error={values.error}
        />
        <Typography component="div" className="login-label">Password</Typography>
        <TextField
          variant="outlined"
          type="password"
          fullWidth
          value={values.password}
          onChange={handleChange('password')}
          onKeyPress={e => { (e.key === 'Enter') && handleLogin() }}
          error={values.error}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
        >Login</Button>
      </Paper>
    </div>
  )
};

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch, ownProps) => ({
  storeUser: (user) => dispatch(storeUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
