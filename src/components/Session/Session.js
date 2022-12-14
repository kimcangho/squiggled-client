//Styling
import "./Session.scss";
//Assets
import phoneIcon from "../../assets/images/icons/phone.svg";

const Session = ({
  sessionID,
  handleJoinSession,
  handleCloseModal,
  myUserID,
  callPeer,
  peerID
}) => {
  const handleJoinClose = (sessionID, userID, peerID) => {
    handleJoinSession(sessionID, userID);
    callPeer(sessionID);
    if (handleCloseModal) {
      handleCloseModal();
    }
  };

  return (
    <div className="session">
      <h3 className="session__name">{sessionID}</h3>
      <img
        className="session__phone"
        src={phoneIcon}
        alt="Phone Icon"
        onClick={() => {
          handleJoinClose(sessionID, myUserID, peerID);
        }}
      />
    </div>
  );
};

export default Session;
