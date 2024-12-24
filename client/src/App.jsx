import React, { useEffect } from "react";
import { useAuth } from "./contexts/AuthProvider.jsx";

function App() {
  const { user, logout, loginWithGoogle, loginWithGitHub, isLoading } =
    useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    // Extract token from URL and store it
    const handleAuthRedirect = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (token) {
        // Save the token to localStorage
        localStorage.setItem("jwt", token);

        // Set the token as the default Authorization header for axios
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Clean up the URL to remove the token
        window.history.replaceState(null, null, window.location.pathname);
      }
    };

    handleAuthRedirect();
  }, []); // Run only once when the component is mounted

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.name}!</h1>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <button onClick={loginWithGoogle}>Login with Google</button>
          <button onClick={loginWithGitHub}>Login with GitHub</button>
        </div>
      )}
    </div>
  );
}

export default App;
