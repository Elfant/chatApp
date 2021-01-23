import React from "react";
import Conversation from "./Conversation";

const Contact = ({name, _id, conversations, setConversations, contacts, user}) => {
  const handleAddingToConversation = () => {
    const newMemberOfConversation = contacts.find(
      (contact) => contact._id === _id
    );

    if (conversations.length === 0) {
      setConversations((prevState) => [
        ...prevState,
        {
          members: [user, newMemberOfConversation],
          messages: [],
        },
      ]);
    } else {
      const contactsId = contacts.map((contact) => contact._id);
      console.log(contactsId)
      //czy id dodawanego uzytkownika jeste rowne id uzytkownika w ktorejkolwiek konwersacji 
      conversations.forEach((conversation, i) => {
      });
    }
  };

  return <li onClick={handleAddingToConversation}>{name}</li>;
};

export default Contact;
