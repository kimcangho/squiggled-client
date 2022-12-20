import "./Header.scss";
//React Hooks
import React, { useContext, useState } from "react";
import { SocketContext } from "../../SocketContext";
//Assets
import quailLogo from "../../assets/images/logo/quail.png";
import joinIcon from "../../assets/images/icons/join-in.svg";
//Component
import ModalMenu from "../ModalMenu/ModalMenu";

const Header = () => {

    //SocketContext
    const {
      activeCall,
      myUserID,
      peerID,
      usersArr,
      sessionID,
      isHost,
      callAccepted,
      receivingCall,
      callPeer,
      acceptCall,
      handleJoinSession,
    } = useContext(SocketContext);

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
      <div className="header__session-container">
        <img
          className="home__button home__button--square"
          src={joinIcon}
          alt="Join Sessions List"
          onClick={toggleSessions}
        />
        {receivingCall && isHost && (
          <div className="header__notification"></div>
        )}
      </div>
    </header>
  );
};

export default Header;
