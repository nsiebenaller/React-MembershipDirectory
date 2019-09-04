import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
//import { createLogger } from 'redux-logger';
import reducers from '../reducers/index.js';
import initialState from './initialState.js';

const store = configureStore(initialState);

function configureStore(initialData) {
  const store = createStore(reducers, initialData, applyMiddleware(thunk, promise))

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index.js');
      store.replaceReducer(nextRootReducer);
    })
  }

  return store
}

export default function render(props) {
  return(
    <Provider store={store}>{props.children}</Provider>
  )
}
