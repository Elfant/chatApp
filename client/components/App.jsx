import React, { useState, useEffect } from "react";

import Sidebar from "./Sidebar";
import Conversation from "./Conversation";
import MessageForm from "./MessageForm";
import Login from "./Login";

const App = () => {
  const [conversations, setConversations] = useState([]);
  const [user, setUser] = useState({}); // id comes from login page
  const [currentInter, setCurrentInter] = useState("");
  const [currentConversation, setCurrentConversation] = useState();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (conversations.length) {
      if (currentInter) {
        setCurrentConversation(
          conversations.find((conv) =>
            conv.members.some((member) => member._id === currentInter)
          )
        );
      } else {
        setCurrentConversation(conversations[0]);
      }
    }
  }, [currentInter, conversations]);

  useEffect(() => {
    // setting conversations after page loaded
    if (Object.entries(user).length) {
      setConversations(user.conversations);
      setContacts(user.contacts);
    }
  }, [user]);

  return (
    <>
      {Object.entries(user).length ? (
        <main className="container">
          <Sidebar
            contacts={contacts}
            conversations={conversations}
            setConversations={setConversations}
            user={user}
            inter={currentInter}
            setInter={setCurrentInter}
          />
          <Conversation
            currentInter={currentInter}
            conversation={currentConversation ? currentConversation : null}
          />
          <MessageForm
            setConversations={setConversations}
            conversations={conversations}
            author={{ name: user._id, user: user.name }}
            currentInter={currentInter}
            currentConversation={currentConversation}
            setCurrentConversation={setCurrentConversation}
          />
        </main>
      ) : (
        <Login setUser={setUser} />
      )}
    </>
  );
};

export default App;
