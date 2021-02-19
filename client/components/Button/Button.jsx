import React from "react";

import styles from "./Button.scss";

const Button = ({ text, fc, isDisabled }) => {
  return (
    <button
      disabled={isDisabled}
      type="submit"
      onClick={fc}
      className={styles.button}
    >
      {text}
    </button>
  );
};

export default Button;
