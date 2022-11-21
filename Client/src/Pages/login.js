import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // Declear use Navigateor for redirect
  let navigate = useNavigate();
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputData;
  // On Input Change it set the value to state
  const onChangeInput = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  // on Sumbit Form
  const onSumbitForm = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert ('Please Fill The Form');
    } else {
      await axios
      .post("http://localhost:5000/login", inputData)
      .then((res) => {
         if (res.status === 200) {
          window.localStorage.setItem("user", JSON.stringify(res));
          console.log(res);
          alert("User Login....");
          navigate("/");
        }else  {
          alert("UserName or Password is incorrect");
        }
      })
      .catch((err) => {
        alert("UserName or Password is incorrect");
      });
    }
    
  };
  return (
    <div>
      <div className="form-box">
        <form>
          <div className="field1">
            <label> Login Form </label>

            <input
              placeholder="E-mail"
              name="email"
              type="email"
              value={email}
              onChange={(e) => onChangeInput(e)}
            />
            <input
              placeholder="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => onChangeInput(e)}
            />
          </div>

          <button
            type="submit"
            className="submitBtn"
            onClick={(e) => {
              onSumbitForm(e);
            }}
          >
            {" "}
            submit
          </button>
        </form>
      </div>
    </div>
  );
}
