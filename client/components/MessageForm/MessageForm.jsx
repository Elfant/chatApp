import React, { useEffect, useState } from "react";

import styles from "./MessageForm.scss";

import Button from "../Button/Button.jsx";

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

    if (inputValue === "" || inputValue.match("^\\s+$")) {
      return;
    }

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
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <textarea
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          rows="3"
          placeholder="Wpisz wiadomość"
          className={styles.text}
        ></textarea>
        <Button isDisabled={!currentInter ? true : false} text="Wyślij" />
      </form>
    </div>
  );
};

export default MessageForm;
