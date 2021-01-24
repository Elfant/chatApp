import React, { useState } from "react";
import Contact from "./Contact";

const Sidebar = ({
  conversations,
  setConversations,
  user,
  setWhichIsClicked,
}) => {
  const [contacts, setContacts] = useState([
    { name: "Kasia", _id: "600ad7aa9e5d7a367841d341" },
    { name: "Jan", _id: "600ad8028b0bec3a00b7c6a1" },
    { name: "Klaudia", _id: "1" },
  ]);

  const handleAddingToConversation = (member) => {
    setWhichIsClicked(member._id);
    if (conversations.some((el) => el._id === member._id)) return;

    setConversations((prevState) => [
      ...prevState,
      {
        _id: member._id,
        members: [user, member],
        messages: [{ author: "kazik", content: "siema co tam" }],
      },
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
