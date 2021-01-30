import React, { useEffect, useState } from "react";
import moment from "moment";

const MessageForm = ({ currentInter, author, currentConversation }) => {
  const [inputValue, setInputValue] = useState("");

  const [newMessage, setNewMessage] = useState({});

  // sending message after submit
  useEffect(() => {
    if (Object.keys(newMessage).length) {
      window.ioClient.sendMessage(newMessage);
      setNewMessage({});
    }
  }, [newMessage]);

  //Creating and sending message
  const handleSubmit = (e) => {
    e.preventDefault();

    setNewMessage(() => ({
      convId: currentConversation._id,
      newMessage: {
        authorName: author.authorName,
        authorId: author.authorId,
        content: inputValue,
        date: moment.now(),
      },
    }));
    setInputValue("");
  };

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
        <button
          disabled={!currentInter ? true : false}
          type="submit"
          value="Wyślij"
          className="create-message__button button"
        >
          Wyślij
        </button>
      </form>
    </div>
  );
};

export default MessageForm;
