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
    _id: "60100ccb2aaa575a98af777f",
    name: "Kazik",
  }); // id comes from login page
  const [conversations, setConversations] = useState([]);
  const [currentInter, setCurrentInter] = useState("");
  const [contacts, setContacts] = useState([]);
  const [currentOpenConversation, setCurrentOpenConversation] = useState({});

  useEffect(() => {
    // setting conversations after page loaded
    ioClient.getConversations(user._id);
    ioClient.setConversations().then((data) => setConversations(data));

    // setting contacts after page loaded
    ioClient.getContacts(user._id);
    ioClient.setContacts().then((data) => setContacts(data.contacts));
  }, []);

  useEffect(() => {
    // finding matching conversation with our interlocutor
    const matching = conversations.find((el) =>
      el.members.some((item) => item._id === currentInter)
    );
    setCurrentOpenConversation(matching);
  }, [currentInter]);

  return (
    <main className="container">
      <Sidebar
        contacts={contacts}
        user={user}
        conversations={conversations}
        setConversations={setConversations}
        setCurrentInter={setCurrentInter}
      />
      <Conversation
        currentInter={currentInter}
        conversation={
          Object.keys(conversations).length
            ? currentOpenConversation
              ? currentOpenConversation
              : null
            : null
        }
      />
      <MessageForm
        author={user}
        currentInter={currentInter}
        currentOpenConversation={currentOpenConversation}
      />
    </main>
  );
};

export default App;
