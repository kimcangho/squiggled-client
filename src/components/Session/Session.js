//Styling
import "./Session.scss";
//Asset
import phoneIcon from "../../assets/images/icons/phone.svg";

const Session = ({
  sessionID,
  handleJoinSession,
  handleCloseModal,
  myUserID,
  callPeer,
  peerID,
}) => {
  //Joins session, calls peer and closes modal
  const handleJoinClose = (sessionID, userID) => {
    handleJoinSession(sessionID, userID);
    callPeer(sessionID, userID);
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
