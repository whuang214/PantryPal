import React, { useContext } from "react";
import { AuthContext } from "./contexts/AuthProvider.jsx";

function App() {
  const { user, login, logout, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.name}!</h1>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <button onClick={() => login({ username: "test", password: "test" })}>
            Login
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
