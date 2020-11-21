import React from 'react';
import { AuthProvider } from './auth-context';

function AppProviders({ children }: any) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default AppProviders;
