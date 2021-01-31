import React from "react";
import Contact from "./Contact";

const Sidebar = ({
  conversations,
  setConversations,
  user,
  contacts,
  setInter,
  inter,
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const handleAddingToConversation = (contact) => {
    setInter(contact._id);
    if (window.innerWidth < 1024) {
      setIsMenuOpen(!isMenuOpen);
    }

    let numberOfCopy = 0;

    conversations.forEach((conv) => {
      if (conv.members.some((el) => el._id === contact._id)) {
        numberOfCopy++;
      }
    });

    if (numberOfCopy === 0) {
      // request for new user after update
      window.ioClient.initConversations({
        members: [{ _id: user._id, name: user.name }, contact],
        id: user._id,
      });

      window.ioClient.setConversations().then((data) => setConversations(data));
    }
  };

  return (
    <aside className={`sidebar ${isMenuOpen ? "sidebar--open-on-mobile" : ""}`}>
      <div className="sidebar__header">
        <h3>Zalogowano jako: {user.name}</h3>
      </div>
      <div className="sidebar__content">
        <div>
          <ul className="sidebar__list">
            {contacts.map((contact) => (
              <Contact
                inter={inter}
                name={user.name}
                contact={contact}
                addConversation={handleAddingToConversation}
                key={contact._id}
              />
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
