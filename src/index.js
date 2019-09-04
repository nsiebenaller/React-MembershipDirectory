import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './components/Login/Login.js';
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
