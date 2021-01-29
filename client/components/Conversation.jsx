import React, { useEffect, useState } from "react";
import Message from "./Message";

const Conversation = ({ conversation, currentInter }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (conversation) {
      setMessages(conversation.messages);
    }
  }, [conversation, currentInter]);

  return (
    <div className="conversation">
      {conversation ? (
        messages.length ? (
          messages.map((msg, i) => <Message key={i} msg={msg} />)
        ) : (
          <p>Brak wiadomosci</p>
        )
      ) : (
        <div>Brak Konwersacji</div>
      )}
    </div>
  );
};

export default Conversation;
