//Styling
import "./ModalMenu.scss";
//React Hooks
import React, { useContext } from "react";
import { SocketContext } from "../../contexts/SocketContext";
//Module
import Modal from "react-modal";
//Assets
import phoneIcon from "../../assets/images/icons/phone.svg";
//Component
import Legend from "../Legend/Legend";
import Session from "../Session/Session";

//Set modal to app
Modal.setAppElement("#root");

const ModalMenu = ({ isOpen, handleCloseModal }) => {
  //SocketContext
  const {
    usersArr,
    handleJoinSession,
    activeCall,
    isHost,
    myUserID,
    sessionID,
    peerID,
    receivingCall,
    acceptCall,
    callPeer,
    callAccepted,
  } = useContext(SocketContext);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Upload Success Modal"
      className="modal-menu"
      overlayClassName="modal-menu__overlay"
    >
      <div className={`modal-menu__container`}>
        {!activeCall ? (
          <>
            <h2 className="modal-menu__title">Active Sessions</h2>

            {usersArr.length === 0 ? (
              <></>
            ) : (
              usersArr.map((sessionID, index) => {
                return (
                  <Session
                    key={index}
                    sessionID={sessionID}
                    handleJoinSession={handleJoinSession}
                    handleCloseModal={handleCloseModal}
                    myUserID={myUserID}
                    callPeer={callPeer}
                    peerID={peerID}
                  />
                );
              })
            )}
          </>
        ) : (
          <>
            <h2 className="sessions-list__title">
              {isHost ? "Broadcasting" : "Viewing"}
            </h2>
            {/* Incoming call notification */}
            {receivingCall && isHost && !callAccepted && (
              <div className="sessions-list__status">
                <h3>Receiving call...</h3>
                <img
                  src={phoneIcon}
                  alt="Phone Icon"
                  className="session__phone"
                  onClick={acceptCall}
                />
              </div>
            )}
            {/* Outgoing call notification */}
            {receivingCall && !isHost && !callAccepted && (
              <div className="sessions-list__status">
                <h3>You are calling {sessionID}</h3>
              </div>
            )}
          </>
        )}
        {/* In-call Legend */}
        {callAccepted && <Legend />}
      </div>
    </Modal>
  );
};

export default ModalMenu;
