import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function AuthRoute(props) {
  if (!props.authenticated) return <Redirect to="/" />;
  return <Route {...props} />;
}
