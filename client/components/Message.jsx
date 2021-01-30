import React from "react";
import moment from "moment";

const Message = ({ msg }) => {
  moment.locale();
  return (
    <div className="conversation__message message">
      <h2>{msg.authorName}</h2>
      {/* <h4>{msg.authorId}</h4> */}
      <p>{msg.content}</p>
      <span>{moment(msg.date).format("HH:mm DD.MM")}</span>
    </div>
  );
};

export default Message;
