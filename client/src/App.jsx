import React, { useState } from "react";
import Home from "./pages/home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? (
        <Home />
      ) : (
        <div>
          <button onClick={() => setIsLoggedIn(true)}>Login</button>
          <button onClick={() => setIsLoggedIn(true)}>Sign Up</button>
        </div>
      )}
    </div>
  );
}

export default App;
