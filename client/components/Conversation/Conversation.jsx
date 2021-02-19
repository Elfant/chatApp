import React, { useEffect, useState } from "react";

import styles from "./Conversation.scss";

import Message from "../Message/Message";

const Conversation = ({
  conversation,
  currentInter,
  user,
  children,
  isMenuOpen,
}) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (conversation) {
      setMessages(conversation.messages);
    }
  }, [conversation, currentInter]);

  return (
    <section className={styles.container}>
      {isMenuOpen ? null : (
        <>
          <div className={styles.messages}>
            {conversation ? (
              messages.length ? (
                messages.map((msg, i) => (
                  <Message user={user} key={i} msg={msg} />
                ))
              ) : (
                <p>Brak wiadomosci</p>
              )
            ) : (
              <div>Brak Konwersacji</div>
            )}
          </div>
          {children}
        </>
      )}
    </section>
  );
};

export default Conversation;
