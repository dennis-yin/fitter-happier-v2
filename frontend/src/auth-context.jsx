import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { FullPageSpinner } from './components/FullPageSpinner';

const AuthContext = React.createContext();
const signInUrl = 'http://localhost:3001/auth/sign_in';
const registerUrl = 'http://localhost:3001/auth/sign_up';

function AuthProvider(props) {
  const [user, setUser] = useState();
  const history = useHistory();

  // code for pre-loading the user's information if we have their token in
  // localStorage goes here

  // 🚨 this is the important bit.
  // Normally your provider components render the context provider with a value.
  // But we post-pone rendering any of the children until after we've determined
  // whether or not we have a user token and if we do, then we render a spinner
  // while we go retrieve that user's information.
  // if (weAreStillWaitingToGetTheUserData) {
  //   return <FullPageSpinner />;
  // }

  async function login(email, password) {
    try {
      const res = await axios({
        method: 'post',
        url: signInUrl,
        data: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' }
      });
      localStorage.setItem('access-token', res.headers['access-token']);
      localStorage.setItem('client', res.headers['client']);
      localStorage.setItem('uid', res.headers['uid']);
      setUser(res.headers['access-token']);
      console.log('Logged in');
      // history.push('/login');
    } catch (err) {
      console.log(err);
    }
  }

  async function register(email, password) {}

  async function logout() {
    ['token', 'client', 'uid'].forEach((item) => localStorage.removeItem(item));
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register }}
      {...props}
    />
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
