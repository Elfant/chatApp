import React from "react";
import Message from "./Message";

const Conversation = ({messages}) => {
  return (
    <div className="conversation">
      {messages.map((message) => (
        <Message
          key={message._id}
          content={message.content}
          name={message.author}
        />
      ))}
    </div>
  );
};

export default Conversation;
