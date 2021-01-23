import React from "react";
import Contact from "./Contact";

const Sidebar = ({ contacts, conversations, setConversations, user }) => {
  return (
    <div className="sidebar">
      <div className="sidebar__buttons-group">
      <h3>Kontakty</h3>
      </div>
      <div className="sidebar__content">
        <div className="sidebar__list">
          <ul>
            {
              contacts.map((contact) => (
                <Contact
                  user={user}
                  contacts={contacts}
                  key={contact._id} 
                  _id={contact._id} 
                  name={contact.name}
                  setConversations={setConversations}
                  conversations={conversations} 
                />
              ))
            }
          </ul>
        </div>
        <button className="sidebar__button-new">Nowa konwersacja</button>
      </div>
    </div>
  );
};

export default Sidebar;
