import "./ModalMenu.scss";
import Modal from "react-modal";
import Session from "../Session/Session";

import tumbleweedImage from "../../assets/images/tumbleweed.png";

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
  callAccepted
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
              <>
                <img
                  className="modal-menu__empty-list"
                  src={tumbleweedImage}
                  alt="Tumbleweed"
                />
                <h3 className="modal-menu__empty-text">It's quiet...</h3>
              </>
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

            <div className="sessions-list__status">
            {receivingCall && isHost && !callAccepted && (
              <>
                <h3>{peerID} is calling you</h3>
                <div className="sessions-list__accept" onClick={acceptCall}>
                  Accept
                </div>
              </>
            )}
            {receivingCall && !isHost && !callAccepted && (
              <>
                <h1>HOLD UP</h1>
                <h3>You are calling {session}</h3>
              </>
            )}
            </div>

            {/* {receivingCall && (
              <div>
                <h3>{peerID} is calling you</h3>
                <button onClick={acceptCall}>Accept</button>
              </div>
            )} */}
          </>
        )}
      </div>
    </Modal>
  );
};

export default ModalMenu;
