import React, { useState, useEffect } from "react";
import connection from "../utils/connection";

import Sidebar from "./Sidebar";
import Conversation from "./Conversation";
import MessageForm from "./MessageForm";

window.ioClient = connection();
const { ioClient } = window;

const App = () => {
  const path = "http://localhost:3000";

  const [user, setUser] = useState({ _id: "600ad71e25785a1edcd3d58e", name: "Ja" }); // id comes from login page
  const [contacts, setContacts] = useState([
    { name: "Kasia", _id: "600ad7aa9e5d7a367841d341" },
    { name: "Jan", _id: "600ad8028b0bec3a00b7c6a1" },
    { name: "Klaudia", _id: "1" },
  ]);
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);

  return (
    <main className="container">
      <Sidebar
        user={user}
        conversations={conversations}
        setConversations={setConversations}
        contacts={contacts}
      />
      <Conversation connection={connection} messages={messages} />
      <MessageForm />
    </main>
  );
};

export default App;
