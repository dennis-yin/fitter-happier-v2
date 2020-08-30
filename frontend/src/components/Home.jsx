import React from 'react';
import { Redirect } from 'react-router-dom';

export default function Home({ authenticated }) {
  if (!authenticated) return <Redirect to="/" />;

  return <div className="main-container">All da categories</div>;
}
