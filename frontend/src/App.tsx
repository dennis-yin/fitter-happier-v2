import React from 'react';
import './App.css';
import { useAuth } from './auth-context';
import AuthenticatedApp from './components/AuthenticatedApp';
import UnauthenticatedApp from './components/UnauthenticatedApp';

function App() {
  const auth = useAuth();
  return auth.user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default App;
