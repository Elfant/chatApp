import React from "react";
import moment from "moment";

const Message = ({ msg, user }) => {
  const distinguishMessage = () => user._id === msg.authorId;

  return (
    <div
      className={`conversation__message message ${
        !distinguishMessage() ? "message--incoming-message" : ""
      }`}
    >
      <span className="message__date">
        {moment(msg.date).format("HH:mm DD.MM")}
      </span>
      <p className="message__content">{msg.content}</p>
    </div>
  );
};

export default Message;
