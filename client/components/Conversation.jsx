import React, { useEffect, useState } from "react";
import Message from "./Message";

const Conversation = ({ conversation }) => {
  console.log(conversation);
  return (
    <div className="conversation">
      {conversation ? (
        conversation.messages.map((msg, i) => <Message key={i} msg={msg} />)
      ) : (
        <div>Brak konwersacji</div>
      )}
    </div>
  );
};

export default Conversation;
