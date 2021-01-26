import React, { useEffect, useState } from "react";
import Message from "./Message";

const Conversation = ({ whichIsClicked, conversation }) => {
  const [matchingConversation, setMatchingConversation] = useState({});

  useEffect(() => setMatchingConversation(conversation), [whichIsClicked]);

  return (
    <div className="conversation">
      {matchingConversation && matchingConversation.messages ? (
        matchingConversation.messages.map((msg, i) => (
          <Message key={i} msg={msg} />
        ))
      ) : conversation ? (
        conversation.messages.map((msg, i) => <Message key={i} msg={msg} />)
      ) : (
        <div>Brak konwersacji</div>
      )}
    </div>
  );
};

export default Conversation;
