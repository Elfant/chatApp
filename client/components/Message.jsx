import React from "react";

const Message = (props) => {
  return(
    <div className="conversation__message message">
      <h4>
        {props.name}
      </h4>
      <p>
        {props.content}
      </p>
    </div>
  );
};

export default Message;