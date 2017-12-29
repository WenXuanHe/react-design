import React, { Component } from 'react';
import store from './store/index';
import routes from  '../routes/index';
import { Provider } from 'react-redux';

export default (
  <Provider store={store}>
    {routes}
  </Provider>
)
