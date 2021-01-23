import React, { useEffect, useState } from "react";
import socketIoClient from "socket.io-client";
import moment from "moment";

const MessageForm = (props) => {
  const [inputValue, setInputValue] = useState("");

  const [newMessage, setNewMessage] = useState({
    id: "",
    author: "",
    content: inputValue,
    date: null,
  });

  //Creating and sending message
  const handleSubmit = (e) => {
    e.preventDefault();

    setNewMessage((prevState) => ({
      id: "123",
      author: "",
      authorId: "",
      content: inputValue,
      date: moment.now(),
    }));
  };

  useEffect(() => {
    if (newMessage.content && newMessage.date) {
      window.ioClient.sendMessage(newMessage);
      setNewMessage({});
    }
  }, [newMessage]);

  return (
    <div className="conversation__create-message create-message">
      <form onSubmit={handleSubmit} className="create-message__form">
        <textarea
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          rows="3"
          placeholder="Wpisz wiadomość"
          className="create-message__text"
        ></textarea>
        <input
          type="submit"
          value="Wyślij"
          className="create-message__button"
        ></input>
      </form>
    </div>
  );
};

export default MessageForm;
