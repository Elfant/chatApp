import React, { useState } from "react";

import styles from "./Login.scss";

import Button from "../Button/Button.jsx";

import connection from "../../utils/connection";

const Login = ({ setUser }) => {
  const [nameValue, setNameValue] = useState("");
  const [password, setPasswordValue] = useState("");

  const handleField = (e, callback) => {
    callback(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchUser = async () => {
      const resp = await fetch(
        `/user?name=${nameValue}&&password=${password}`
      ).catch((e) => console.log(e));
      const user = await resp.json();

      if (Object.entries(user).length) {
        setUser(user);
        window.ioClient = connection("http://localhost:3000", user._id);
      }
    };

    fetchUser();
  };

  return (
    <main className={styles.container}>
      <div className={styles.logo}></div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.wrapper}>
          <h5 className={styles.nameHeader}>Login</h5>
          <input
            onChange={(e) => handleField(e, setNameValue)}
            value={nameValue}
            className={styles.name}
            type="text"
            placeholder="np: Mariusz, Kasia, Kazik"
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
        <Button fc={handleSubmit} text="zaloguj się" />
      </form>
    </main>
  );
};

export default Login;
