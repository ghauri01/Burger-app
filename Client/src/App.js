import React from "react";
import "./Assets/css/App.css";
import "./Assets/css/Form.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home/index";
import Register from "./Pages/register";
import Login from "./Pages/login";
function App() {
  return (

    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </Router>

  
  );
}



export default App;
