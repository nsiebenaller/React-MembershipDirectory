import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './mui_theme.js';

export default function MaterialTheme(props) {
  return(
    <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
  )
}
