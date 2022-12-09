import "./Header.scss";

import { useState } from "react";

import quailLogo from "../../assets/images/logo/quail.png";
import joinIcon from "../../assets/images/icons/join-in.svg";
import closeIcon from "../../assets/images/icons/close-line.svg";

const Header = ({ myUserID }) => {

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const toggleSessions = () => {
    setMenuIsOpen((menuIsOpen) => !menuIsOpen);
  };

  return (
    <header className="home__header">

      {/* Logo */}
      <div className="home__header-container">
        <img className="home__button" src={quailLogo} alt="Qual Quail Logo" />
        {/* <h1 className="home__title">{`Welcome, ${myUserID}`}</h1> */}
      </div>

      {/* Menu */}
      {menuIsOpen ? (
        <img
          className="home__button home__button--square"
          src={closeIcon}
          alt="Close Sessions List"
          onClick={toggleSessions}
        />
      ) : (
        <img
          className="home__button home__button--square"
          src={joinIcon}
          alt="Join Sessions List"
          onClick={toggleSessions}
        />
      )}
    </header>
  );
};

export default Header;
