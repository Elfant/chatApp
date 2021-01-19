import React, { useState, useEffect } from "react";
import socketIoClient from "socket.io-client";

import Sidebar from "./Sidebar";
import Conversation from "./Conversation";

const App = () => {
  const path = "http://localhost";

  const [response, setResponse] = useState({});

  //connetct to server
  useEffect(() => {
    const socket = socketIoClient("http://localhost:3000");
    socket.on("pies", (resp) => console.log(resp));
  }, []);

  return (
    <main className="container">
      <Sidebar />
      <Conversation />
    </main>
  );
};

export default App;
