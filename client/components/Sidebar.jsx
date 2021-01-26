import React, { useState } from "react";
import Contact from "./Contact";

const Sidebar = ({
  conversations,
  setConversations,
  user,
  setCurrentInter,
  contacts,
}) => {
  const handleAddingToConversation = (member) => {
    setCurrentInter(member._id);

    const conversationContent = {
      _id: member._id,
      members: [user, member],
      messages: [],
    };

    let numberOfCopy = 0;

    conversations.forEach((element) => {
      if (element.members.some((el) => el._id === member._id)) {
        numberOfCopy++;
      };
    });

    if (numberOfCopy === 0) {
      setConversations((prevState) => [...prevState, conversationContent]);
      window.ioClient.initConversations([user, member]);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__buttons-group">
        <h3>Kontakty</h3>
      </div>
      <div className="sidebar__content">
        <div className="sidebar__list">
          <ul>
            {contacts.map((contact) => (
              <Contact
                contact={contact}
                addConversation={handleAddingToConversation}
                key={contact._id}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
