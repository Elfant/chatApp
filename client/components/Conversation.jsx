import React from "react";
import Message from "./Message";

const Conversation = ({ conversations, whichIsClicked }) => {
  const displayMatchingConversation = () => {
    const matchingConversation = conversations.find(
      (el) => el._id === whichIsClicked
    );
    const { messages } = matchingConversation;

    if (messages.length) {
      return messages.map((el, i) => (
        <div key={i}>Konwersacja {whichIsClicked}</div>
      ));
    } else {
      return <div>Brak wiadomosci</div>;
    }
  };

  return (
    <div className="conversation">
      {conversations.length ? (
        displayMatchingConversation()
      ) : (
        <h1>Nie masz zadnych konwesacji</h1>
      )}
    </div>
  );
};

export default Conversation;
