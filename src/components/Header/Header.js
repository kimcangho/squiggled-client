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
  session,
  peerID,
  receivingCall,
  acceptCall,
  callPeer
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const toggleSessions = () => {
    setMenuIsOpen((menuIsOpen) => {
      if (!menuIsOpen) {
        handleOpenModal();
      }
      return !menuIsOpen;
    });
  };

  return (
    <header className="home__header">
      <ModalMenu
        isOpen={isOpen}
        handleCloseModal={handleCloseModal}
        usersArr={usersArr}
        handleJoinSession={handleJoinSession}
        activeCall={activeCall}
        isHost={isHost}
        myUserID={myUserID}
        session={session}
        peerID={peerID}
        receivingCall={receivingCall}
        acceptCall={acceptCall}
        callPeer={callPeer}
      />

      {/* Logo */}
      <div className="home__header-container">
        <img className="home__button" src={quailLogo} alt="Qual Quail Logo" />
        <h1 className="home__title">{`Welcome, ${myUserID}`}</h1>
      </div>

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
