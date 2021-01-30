import React, { useEffect, useState } from "react";
import Message from "./Message";

const Conversation = ({ conversation, currentInter, user, children }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (conversation) {
      setMessages(conversation.messages);
    }
  }, [conversation, currentInter]);

  return (
    <section className="conversation">
      <div className="conversation__messages">
        {conversation ? (
          messages.length ? (
            messages.map((msg, i) => <Message user={user} key={i} msg={msg} />)
          ) : (
            <p>Brak wiadomosci</p>
          )
        ) : (
          <div>Brak Konwersacji</div>
        )}
      </div>
      {children}
    </section>
  );
};

export default Conversation;
