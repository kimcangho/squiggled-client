//Styling
import "./Session.scss";
//Assets
import phoneIcon from "../../assets/images/icons/phone.svg";

const Session = ({ name, handleJoinSession , handleCloseModal, myUserID}) => {

  const handleJoinClose = (name, userID) => {
    
    handleJoinSession(name, userID);
    if (handleCloseModal) {
      handleCloseModal();
    }
    
  }

  return (
    <div className="session">
      <h3 className="session__name">{name}</h3>
      <img
        className="session__phone"
        src={phoneIcon}
        alt="Phone Icon"
        onClick={()=> {handleJoinClose(name, myUserID)}}
      />
    </div>
  );
};

export default Session;
