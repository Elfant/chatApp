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
    _id: "600f1de9096c7e1388297f17",
    name: "Kazik",
  }); // id comes from login page
  const [conversations, setConversations] = useState([]);
  const [whichIsClicked, setWhichIsClicked] = useState("");
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    ioClient.getConversations(user._id);
    ioClient
      .setConversations()
      .then((data) => setConversations(data.userConversations));

    ioClient.getContacts(user._id);
    ioClient.setContacts().then((data) => setContacts(data.contacts));
  }, []);

  return (
    <main className="container">
      <Sidebar
        contacts={contacts}
        user={user}
        conversations={conversations}
        setConversations={setConversations}
        setWhichIsClicked={setWhichIsClicked}
      />
      <Conversation
        whichIsClicked={whichIsClicked}
        conversation={
          whichIsClicked
            ? conversations.find((el) => el._id === whichIsClicked)
            : conversations[0]
        }
      />
      <MessageForm author={user} whichIsClicked={whichIsClicked} />
    </main>
  );
};

export default App;
