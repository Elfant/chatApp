import React from "react";

const Contact = ({ addConversation, contact }) => {
  return <li onClick={() => addConversation(contact)}>{contact.name}</li>;
};

export default Contact;
