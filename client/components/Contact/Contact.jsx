import React from "react";

import styles from "./Contact.scss";

const Contact = ({ addConversation, contact, inter }) => {
  return (
    <li
      className={`${styles.contact} ${
        contact._id === inter ? `${styles["contact--clicked"]}` : ""
      }`}
      onClick={() => addConversation(contact)}
    >
      {contact.name}
    </li>
  );
};

export default Contact;
