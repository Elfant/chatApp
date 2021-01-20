import React, { useState, useEffect } from "react";
import socketIoClient from "socket.io-client";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Conversation from "./Conversation";

const App = () => {
  const path = "http://localhost:3000";

  const [messages, setMessages] = useState([
    { id: "1", content: "Message1", name: "User1" },
    { id: "2", content: "Message2", name: "User2" },
    { id: "3", content: "Message3", name: "User3" },
  ]);

  //connetct to server
  // useEffect(() => {
  //   // const socket = socketIoClient("http://localhost:3000");
  //   // socket.on("pies", (resp) => console.log(resp));
  // }, []);

  return (
    <>
      <main className="container">
        <Navbar />
        <div className="container__wrapper">
          <Sidebar />
          <Conversation messages={messages} />
        </div>
      </main>
    </>
  );
};

export default App;
