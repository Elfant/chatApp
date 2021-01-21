import React, { useEffect, useState } from "react";
import socketIoClient from "socket.io-client";

const CreateMessage = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [newMessage, setNewMessage] = useState({
    id: 1,
    content: "",
    name: "User4",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setNewMessage((prevState) => ({
      ...prevState,
      content: inputValue,
    }));
    
    const socket = socketIoClient("http://localhost:3000");
    socket.emit("message", newMessage);
  };

  //connect to server
  return (
    <div className="conversation__create-message create-message">
      <form onSubmit={handleSubmit} className="create-message__form">
        <textarea
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          rows="3"
          placeholder="Wpisz wiadomość do swojego BRO!"
          className="create-message__text"
          spellcheck="true"
        ></textarea>
        <input
          type="submit"
          value="WYŚLIJ"
          className="create-message__button button"
        ></input>
      </form>
    </div>
  );
};

export default CreateMessage;
