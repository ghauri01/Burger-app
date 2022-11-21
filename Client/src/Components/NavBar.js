import React, { useEffect } from "react";
import "../Assets/css/App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const appLogo = require("../Assets/images/App-logo.png");

function NavBar() {
  // Import User form Local Stroage
  const user = JSON.parse(window.localStorage.getItem("user"));
  let navigate = useNavigate();
  const logout = async () => {
    console.log("In Logout");

    await axios.post("http://localhost:5000/logout", user).then((res) => {
      if (res.status === 400 || !res) {
        alert("There is some problem please wait ");
      } else {
        // Delete user form Local Storage
        window.localStorage.removeItem("user");
        // navigate to the Login
        navigate("/login");
      }
    });
  };

  return (
    <div className="topnav">
      <img alt="" className="app-logo" src={appLogo} />
      <div className="topnav-right">
        {user !== null && (
          <a className="active" href="/">
            Burger Build
          </a>
        )}

        {user == null && (
          <div>
            <a href="/login">SignIn</a>
            <a href="/register">SignUp</a>
          </div>
        )}

        {user !== null && <button onClick={logout}>LogOut</button>}
      </div>
    </div>
  );
}

export default NavBar;
