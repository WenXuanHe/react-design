import './global';
import React from 'react';
import { render } from 'react-dom';
import Provider from './redux/index.js';
render(
  Provider,
  document.getElementById('app')
);
