import React from "react";

const CreateMessage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="conversation__create-message create-message">
      <form onSubmit={handleSubmit} className="create-message__form">
        <textarea
          rows="3"
          placeholder="Wpisz wiadomość"
          className="create-message__text"
        ></textarea>
        <input
          type="submit"
          value="Wyślij"
          className="create-message__button"
        ></input>
      </form>
    </div>
  );
};

export default CreateMessage;
