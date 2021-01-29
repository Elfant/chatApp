import React from "react";

const Message = ({ msg }) => {
  return (
    <div className="conversation__message message">
      <h2>{msg.authorName}</h2>
      <h4>{msg.authorId}</h4>
      <p>{msg.content}</p>
      <span>data{msg.date}</span>
    </div>
  );
};

export default Message;
