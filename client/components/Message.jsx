import React from "react";

const Message = (props) => {
  return (
    <div className="conversation__message message">
      <h4>{props.temp}</h4>
      <p>zawartosc</p>
      <span>czas</span>
    </div>
  );
};

export default Message;
