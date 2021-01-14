import React from "react";
import CreateMessage from "./CreateMessage";
import Message from "./Message";

const Conversation = () => (
  <div className="conversation">
    <Message />
    <Message />
    <Message />
    <Message />
    <Message />
    <CreateMessage />
  </div>
);

export default Conversation;
