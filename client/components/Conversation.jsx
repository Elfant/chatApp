import React from "react";
import CreateMessage from "./CreateMessage";
import Message from "./Message";

const Conversation = (props) => {
  return (
    <div className="conversation">
      {
        props.messages.map((message) => (
          <Message key={message.id} content={message.content} name={message.name}/>
        ))
      }
    <CreateMessage />
  </div>
  );
};

export default Conversation;
