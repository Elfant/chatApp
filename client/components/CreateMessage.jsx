import React from "react";

const CreateMessage = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea rows="3" cols="100" placeholder="Wpisz wiadomość"></textarea>
          <input type="submit" value="Wyślij"></input>
      </form>
    </div>
  );
};

export default CreateMessage;
