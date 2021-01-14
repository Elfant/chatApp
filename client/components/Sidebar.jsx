import React from "react";

const Sidebar = () => (
  <div className="sidebar">
    <div className="sidebar__buttons-group">
      <button className="sidebar__button">Konwersacje</button>
      <button className="sidebar__button">Kontakty</button>
    </div>
    <div className="sidebar__content">
      <div className="sidebar__list">
        <ul>
          <li>Rozmowa z Janem</li>
          <li>Rozmowa z Pawłem</li>
        </ul>
      </div>
      <button className="sidebar__button-new">Nowa konwersacja</button>
    </div>
  </div>
);

export default Sidebar;
