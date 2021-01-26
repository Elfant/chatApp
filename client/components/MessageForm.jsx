import React, { useEffect, useState } from "react";
import socketIoClient from "socket.io-client";
import moment from "moment";

const MessageForm = ({whichIsClicked, author}) => {
  const [inputValue, setInputValue] = useState("");

  const [newMessage, setNewMessage] = useState({});

  //Creating and sending message
  const handleSubmit = (e) => {
    e.preventDefault();

    setNewMessage(() => ({
      author: author.name,
      authorId: author._id,
      content: inputValue,
      date: moment.now(),
    }));

    setInputValue("");
  };

  useEffect(() => {
    if (newMessage.content && newMessage.date) {
     console.log(whichIsClicked)
      window.ioClient.sendMessage({ newMessage, currentInter: whichIsClicked });
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
          disabled={whichIsClicked ? false : true}
          type="submit"
          value="Wyślij"
          className="create-message__button"
        ></input>
      </form>
    </div>
  );
};

export default MessageForm;
