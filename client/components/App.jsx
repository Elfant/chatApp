import React, { useState, useEffect } from "react";
import connection from "../utils/connection";

import Sidebar from "./Sidebar";
import Conversation from "./Conversation";
import MessageForm from "./MessageForm";

window.ioClient = connection();
const { ioClient } = window;

const App = () => {
  const path = "http://localhost:3000";

  const [user, setUser] = useState({
    _id: "6011f6e9d20a2556b4d812b6",
    name: "Kazik",
  }); // id comes from login page
  const [conversations, setConversations] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [currentInter, setCurrentInter] = useState("");
  const [currentConversation, setCurrentConversation] = useState({});

  useEffect(() => {
    if (conversations.length && currentInter) {
      setCurrentConversation(
        conversations.find((conv) =>
          conv.members.some((member) => member._id === currentInter)
        )
      );
    }
  }, [currentInter, conversations]);

  useEffect(() => {
    // setting conversations after page loaded
    ioClient.getConversations(user._id);
    ioClient.setConversations().then((data) => setConversations(data));

    // setting contacts after page loaded
    ioClient.getContacts(user._id);
    ioClient.setContacts().then((data) => setContacts(data.contacts));
  }, [user]);

  return (
    <main className="container">
      <Sidebar
        contacts={contacts}
        conversations={conversations}
        setConversations={setConversations}
        user={user}
        inter={currentInter}
        setInter={setCurrentInter}
      />
      <Conversation />
      <MessageForm
        author={user}
        currentInter={currentInter}
        currentConversation={currentConversation}
      />
    </main>
  );
};

export default App;
