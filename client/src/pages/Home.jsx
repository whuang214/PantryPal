import React from "react";
import { useAuth } from "../contexts/AuthProvider";

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
