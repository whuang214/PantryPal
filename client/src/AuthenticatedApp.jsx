// AuthenticatedApp.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Lists from "./pages/Lists.jsx";
import NavBar from "./components/NavBar.jsx";

const AuthenticatedApp = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lists" element={<Lists />} />
      </Routes>
    </Router>
  );
};

export default AuthenticatedApp;
