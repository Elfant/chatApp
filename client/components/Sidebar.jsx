import React, { useEffect, useState } from "react";
import Contact from "./Contact";

const Sidebar = ({
  conversations,
  setConversations,
  user,
  contacts,
  setInter,
}) => {
  const handleAddingToConversation = (contact) => {
    setInter(contact._id);

    let numberOfCopy = 0;

    conversations.forEach((conv) => {
      if (conv.members.some((el) => el._id === contact._id)) {
        numberOfCopy++;
      }
    });

    if (numberOfCopy === 0) {
      // request for new user after update
      window.ioClient.initConversations({
        members: [user, contact],
        id: user._id,
      });

      window.ioClient.setConversations().then((data) => setConversations(data));
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
