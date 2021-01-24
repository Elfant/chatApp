import React from "react";
import Conversation from "./Conversation";

const Contact = ({ addConversation, contact }) => {
  return <li onClick={() => addConversation(contact)}>{contact.name}</li>;
};

export default Contact;
