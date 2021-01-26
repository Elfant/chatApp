import React, { useState } from "react";
import Contact from "./Contact";

const Sidebar = ({
  conversations,
  setConversations,
  user,
  setWhichIsClicked,
  contacts
}) => {
 
  const handleAddingToConversation = (member) => {
    setWhichIsClicked(member._id);

    if (conversations.some((el) => el._id === member._id)) return;

    const conversationContent = {
      _id: member._id,
      members: [user, member],
      messages: [],
    };

    //sending new conversation to server
    window.ioClient.initConversations(user._id);
    window.ioClient.addConversation({conversationContent, ownerId: user._id});

    setConversations((prevState) => [
      ...prevState,
      conversationContent
    ]);
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
