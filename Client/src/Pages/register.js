import React, { useState } from "react";
import axios from "axios";
export default function Register() {
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = inputData;
  // On Input Change it set the value to state
  const onChangeInput = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  // on Sumbit Form
  const onSumbitForm = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please Fill Full Form");
    } else {
      await axios
        .post("http://localhost:5000/register", inputData)
        .then((res) => {
          if (res.status === 400 || !res) {
            alert("User Not Register There is problem");
          } else {
            alert("User Register....");
          }
        });
    }
  };
  return (
    <div>
      <div className="form-box">
        <form>
          <div className="field1">
            <label> Registeration Form </label>
            <input
              placeholder="Name"
              name="name"
              type= 'text'
              value={name}
              onChange={(e) => onChangeInput(e)}
            />
            <input
              placeholder="E-mail"
              name="email"
              type = 'email'
              value={email}
              onChange={(e) => onChangeInput(e)}
            />
            <input
              placeholder="Password"
              name="password"
              type = 'password'
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
