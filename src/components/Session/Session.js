//Styling
import "./Session.scss";
//Assets
import phoneIcon from "../../assets/images/icons/phone.svg";

const Session = ({
  name,
  handleJoinSession,
  handleCloseModal,
  myUserID,
  callPeer,
  peerID
}) => {
  const handleJoinClose = (name, userID, peerID) => {
    handleJoinSession(name, userID);
    callPeer(name);
    if (handleCloseModal) {
      handleCloseModal();
    }
  };

  return (
    <div className="session">
      <h3 className="session__name">{name}</h3>
      <img
        className="session__phone"
        src={phoneIcon}
        alt="Phone Icon"
        onClick={() => {
          handleJoinClose(name, myUserID, peerID);
        }}
      />
    </div>
  );
};

export default Session;
