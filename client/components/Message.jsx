import React from "react";

const Message = ({ msg }) => {
  return (
    <div className="conversation__message message">
      <h4>{msg.author}</h4>
      <p>{msg.content}</p>
      <span>{msg.date}</span>
    </div>
  );
};

export default Message;
