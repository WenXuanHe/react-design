import React, { Component } from 'react';
import getStore from './store/index';
import routes from  '../routes/index';
import { Provider } from 'react-redux';
import _INITIAL_STATE_ from './store/data';

let store = getStore(_INITIAL_STATE_);

export default (
  <Provider store={store}>
    {routes}
  </Provider>
)
