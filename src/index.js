import React from 'react';
import ReactDOM from 'react-dom';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './index.css';
import App from './components/router.js';

import * as serviceWorker from './config/serviceWorker';
import ReduxStore from './config/redux.js'
import MaterialTheme from './config/mui.js';


ReactDOM.render(
  <MaterialTheme>
    <ReduxStore>
      <App />
    </ReduxStore>
  </ MaterialTheme>
  , document.getElementById('root')
)

serviceWorker.unregister();
