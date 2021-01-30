import React from "react";

const Contact = ({ addConversation, contact, inter }) => {
  return (
    <li
      className={`sidebar__contact ${
        contact._id === inter ? "sidebar__contact--clicked" : ""
      }`}
      onClick={() => addConversation(contact)}
    >
      {contact.name}
    </li>
  );
};

export default Contact;
