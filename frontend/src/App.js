import React, { useState } from 'react';
import './App.css';
import SignIn from './components/SignIn';

function App() {
  const [signedIn, setSignedIn] = useState(false);

  return (
    <div className="App">
      {!signedIn && <SignIn setSignedIn={setSignedIn} />}
      {signedIn && <div>You're signed in</div>}
    </div>
  );
}

export default App;
