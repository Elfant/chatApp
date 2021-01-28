import React, { useEffect, useState } from "react";
import Message from "./Message";

const Conversation = ({ conversation, currentOpen }) => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages(conversation.messages);
  }, [conversation, currentOpen]);

  return (
    <div className="conversation">
      {messages ? (
        messages.map((msg, i) => <Message key={i} msg={msg} />)
      ) : (
        <div>brak konwersacji</div>
      )}
    </div>
  );
};

export default Conversation;
