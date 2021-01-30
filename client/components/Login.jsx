import React, { useState } from "react";

import connection from "../utils/connection";

const Login = ({ setUser }) => {
  const [nameValue, setNameValue] = useState("");
  const [password, setPasswordValue] = useState("");

  const handleField = (e, callback) => {
    callback(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fetchUser = async () => {
      const resp = await fetch(`/user?name=${nameValue}&&password=${password}`);
      const user = await resp.json();

      if (Object.entries(user).length) {
        setUser(user);
        window.ioClient = connection("http://localhost:3000", user._id);
      }
    };

    fetchUser();
  };

  return (
    <main className="login">
      <div className="login__logo"></div>
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__wrapper">
          <h5 className="login__name-header">Login</h5>
          <input
            onChange={(e) => handleField(e, setNameValue)}
            value={nameValue}
            className="login__name"
            type="text"
            placeholder="np.: Bartek, Kasia, Kazik"
          ></input>
        </div>
        {/* <label>
          haslo
          <input
            onChange={(e) => handleField(e, setPasswordValue)}
            value={password}
            className="login__name"
            type="password"
          />
        </label> */}
        <label>
          <button type="submit" className="login__button button">
            Zaloguj się
          </button>
        </label>
      </form>
    </main>
  );
};

export default Login;
