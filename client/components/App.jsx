import React, { useState, useEffect } from "react";

import styles from "../scss/main.scss"

import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import Conversation from "./Conversation/Conversation";
import MessageForm from "./MessageForm/MessageForm";
import Login from "./Login/Login";

const App = () => {
  const [conversations, setConversations] = useState([]);
  const [user, setUser] = useState({}); // id comes from login page
  const [currentInter, setCurrentInter] = useState("");
  const [currentConversation, setCurrentConversation] = useState();
  const [contacts, setContacts] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (conversations.length) {
      if (currentInter) {
        setCurrentConversation(
          conversations.find((conv) =>
            conv.members.some((member) => member._id === currentInter)
          )
        );
      } else {
        setCurrentConversation(conversations[0]);
      }
    }
  }, [currentInter, conversations]);

  useEffect(() => {
    if (window.ioClient) {
      window.ioClient.getMessage().then((data) => {
        setConversations((prevState) => {
          const newState = prevState.filter((a) => {
            return a._id !== data._id;
          });
          newState.push(data);
          return newState;
        });
      });
    }
  });

  useEffect(() => {
    // setting conversations after page loaded
    if (Object.entries(user).length) {
      setConversations(user.conversations);
      setContacts(user.contacts);
    }
  }, [user]);

  return (
    <>
      {Object.entries(user).length ? (
        <main className={styles.container}>
          <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <div className={styles.wrapper}>
            <Sidebar
              contacts={contacts}
              conversations={conversations}
              setConversations={setConversations}
              user={user}
              inter={currentInter}
              setInter={setCurrentInter}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
            />
            <Conversation
              isMenuOpen={isMenuOpen}
              user={user}
              conversatios={conversations}
              currentInter={currentInter}
              conversation={currentConversation ? currentConversation : null}
            >
              <MessageForm
                setConversations={setConversations}
                conversations={conversations}
                author={{ authorId: user._id, authorName: user.name }}
                currentInter={currentInter}
                currentConversation={currentConversation}
                setCurrentConversation={setCurrentConversation}
              />
            </Conversation>
          </div>
        </main>
      ) : (
        <Login setUser={setUser} />
      )}
    </>
  );
};

export default App;
