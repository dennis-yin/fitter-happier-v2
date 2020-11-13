import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.tsx';
import AppProviders from './context.tsx';

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById('root')
);
