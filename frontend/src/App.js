import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AuthContext from './AuthContext';
import SignIn from './components/SignIn';
import Home from './components/Home';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={authenticated}>
      <Router>
        <Switch>
          <Route
            path="/"
            render={() => <SignIn setAuthenticated={setAuthenticated} />}
          />
          <Route path="/home" component={Home} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
