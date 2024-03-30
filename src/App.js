import React, { useState } from "react";
import "./App.css";
import Signup from "./components/signUp/Signup";
import Signin from "./components/Login/Signin";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Routes, Route, NavLink, Link, Navigate } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"));

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    this.setState({
      navigate: true,
    });
  };

  return (
    <div className="App">
      <Router>
        {!isLoggedIn ? (
            <>
              <NavLink to="/sign-in" className="signIn">
                Sign In
              </NavLink>
              <NavLink to="/sign-up" className="signUp">
                Sign Up
              </NavLink>
            </>
          ) : (
            <Link to="/sign-in" onClick={handleLogout} className="signOut">
              Logout
            </Link>
          )}
        <Routes>    
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Signin setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
