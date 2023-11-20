import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./styles.css";
import Cookies from "js-cookie";
import axios from "axios";
// import googleicon from "./google.png";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const [type, setType] = useState(true);
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
    console.log(login);
  };

  const loginSubmit = async () => {
    try {
      console.log(login);
      const { data } = await axios.post(
        `https://stg.dhunjam.in/account/admin/login`,
        login
      );
      console.log(data);
      setError("");
      setSuccess(data);
      //   const { message, ...rest } = data;

      dispatch({ type: "LOGIN", payload: data });
      Cookies.set("user", JSON.stringify(data));
      //   navigate("/");
    } catch (err) {
      setSuccess("");
      setError(err.response.data.message);
    }
  };

  const handleType = async () => {
    console.log("here");
    if (type == "password") {
      setType("type");
    } else if (type == "text") {
      setType("password");
    }
  };
  console.log(type);

  return (
    <div className="login-container">
      <h1>Venue Admin Login</h1>
      {/* <form action="/login" method="post"> */}
      <div className="input-group">
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          onChange={handleLoginChange}
          required
        />
      </div>
      <div className="input-group pass">
        {type ? (
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={handleLoginChange}
            required
          />
        ) : (
          <input
            type="text"
            id="password"
            name="password"
            placeholder="Password"
            onChange={handleLoginChange}
            required
          />
        )}

        <span className="seepassword">
          <div onClick={() => setType((prev) => !prev)}>
            <i class="fas fa-eye"></i>
          </div>
        </span>
      </div>
      <button
        type="submit"
        className="save-button"
        onClick={() => loginSubmit()}
      >
        Sign in
      </button>
      <p className="registration">New Registration?</p>
      {/* </form> */}
    </div>
  );
}
