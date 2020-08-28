import React, { useState } from 'react';
import './App.css';
import SignIn from './components/SignIn';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <div className="App">
      {!authenticated && <SignIn setAuthenticated={setAuthenticated} />}
      {authenticated && <div>You're signed in</div>}
    </div>
  );
}

export default App;
