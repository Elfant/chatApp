import React, { useState } from "react";
const Login = () => {
  const [nameValue, setNameValue] = useState("");
  const [password, setPasswordValue] = useState("");

  const handleField = (e, callback) => {
    callback(e.target.value);
  };

  return (
    <main className="login">
      <form className="login__form">
        <label>
          login
          <input
            onChange={(e) => handleField(e, setNameValue)}
            value={nameValue}
            className="login__name"
            type="text"
          ></input>
        </label>
        <label>
          haslo
          <input
            onChange={(e) => handleField(e, setPasswordValue)}
            value={password}
            className="login__name"
            type="password"
          />
        </label>
        <label>
          <button type="submit">Zaloguj sie</button>
        </label>
      </form>
    </main>
  );
};

export default Login;
