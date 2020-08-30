import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AuthContext from './AuthContext';
import AuthRoute from './components/AuthRoute';
import SignIn from './components/SignIn';
import Home from './components/Home';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={authenticated}>
      <Router >
        <Switch>
          <Route
            path="/login"
            render={() => <SignIn setAuthenticated={setAuthenticated} />}
          />
          <AuthRoute path="/" component={Home} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
