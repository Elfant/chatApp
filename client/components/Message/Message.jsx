import React from "react";
import moment from "moment";

import styles from "./Message.scss";

const Message = ({ msg, user }) => {
  const distinguishMessage = () => user._id === msg.authorId;

  return (
    <div
      className={`${styles.container} ${
        !distinguishMessage() ? styles["container--incoming-message"] : ""
      }`}
    >
      <span>{moment(msg.date).format("HH:mm DD.MM")}</span>
      <p className={styles.content}>{msg.content}</p>
    </div>
  );
};

export default Message;
