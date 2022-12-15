import "./Header.scss";

import { useState } from "react";

import quailLogo from "../../assets/images/logo/quail.png";
import joinIcon from "../../assets/images/icons/join-in.svg";
import ModalMenu from "../ModalMenu/ModalMenu";

const Header = ({
  myUserID,
  usersArr,
  handleJoinSession,
  activeCall,
  isHost,
  sessionID,
  peerID,
  receivingCall,
  acceptCall,
  callPeer,
  callAccepted,
}) => {
  const [_menuIsOpen, setMenuIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  //Open Modal Menu
  const handleOpenModal = () => {
    setIsOpen(true);
  };
  //Close Modal Menu
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  //Trigger Modal Open
  const toggleSessions = () => {
    setMenuIsOpen((menuIsOpen) => {
      if (!menuIsOpen) {
        handleOpenModal();
      }
      return !menuIsOpen;
    });
  };

  return (
    <header className="header">
      <ModalMenu
        isOpen={isOpen}
        handleCloseModal={handleCloseModal}
        usersArr={usersArr}
        handleJoinSession={handleJoinSession}
        activeCall={activeCall}
        isHost={isHost}
        myUserID={myUserID}
        sessionID={sessionID}
        peerID={peerID}
        receivingCall={receivingCall}
        acceptCall={acceptCall}
        callPeer={callPeer}
        callAccepted={callAccepted}
      />

      {/* Logo */}
      <div className="header__container">
        <img className="header__logo" src={quailLogo} alt="Qual Quail Logo" />
        <h1 className="header__title">{`User: ${myUserID}`}</h1>
      </div>
      {/* Open Modal Menu */}
      <img
        className="home__button home__button--square"
        src={joinIcon}
        alt="Join Sessions List"
        onClick={toggleSessions}
      />
    </header>
  );
};

export default Header;
