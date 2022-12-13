import "./ModalMenu.scss";
import Modal from "react-modal";
import Session from "../Session/Session";

import phoneIcon from "../../assets/images/icons/phone.svg";

Modal.setAppElement("#root");

const ModalMenu = ({
  isOpen,
  handleCloseModal,
  usersArr,
  handleJoinSession,
  activeCall,
  isHost,
  myUserID,
  session,
  peerID,
  receivingCall,
  acceptCall,
  callPeer,
  callAccepted,
}) => {
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
              usersArr.map((session, index) => {
                return (
                  <Session
                    key={index}
                    name={session}
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
              {isHost ? "Hosting" : "Visiting"}
            </h2>

            {receivingCall && isHost && !callAccepted && (
              <div className="sessions-list__status">
                <h3>{peerID} is calling you</h3>
                <img
                  src={phoneIcon}
                  alt="Phone Icon"
                  className="session__phone"
                  onClick={acceptCall}
                />
              </div>
            )}
            {receivingCall && !isHost && !callAccepted && (
              <div className="sessions-list__status">
                <h3>You are calling {session}</h3>
              </div>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

export default ModalMenu;
