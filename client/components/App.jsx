import React, { useState, useEffect } from "react";
import socketIoClient from "socket.io-client";

import Sidebar from "./Sidebar";
import Conversation from "./Conversation";

const App = () => {
  const path = "http://localhost:3000";

  const [messages, setMessages] = useState([]);

  //getting messeges from db
  useEffect(() => {
    const io = socketIoClient(path);
    io.on("sendConversation", (msg) => console.log(msg))
  }, []);

  return (
    <main className="container">
      <Sidebar />
      <Conversation messages={messages} />
    </main>
  );
};

export default App;
