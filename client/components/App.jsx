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
    _id: "600ad71e25785a1edcd3d58e",
    name: "Ja",
  }); // id comes from login page
  const [conversations, setConversations] = useState([]);
  const [whichIsClicked, setWhichIsClicked] = useState("");

  return (
    <main className="container">
      <Sidebar
        user={user}
        conversations={conversations}
        setConversations={setConversations}
        setWhichIsClicked={setWhichIsClicked}
      />
      <Conversation
        whichIsClicked={whichIsClicked}
        connection={connection}
        conversations={conversations}
      />
      <MessageForm author={user} whichIsClicked={whichIsClicked}/>
    </main>
  );
};

export default App;
