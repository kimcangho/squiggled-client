//Styling
import "./Session.scss";
//Assets
import phoneIcon from "../../assets/images/icons/phone.svg";

const Session = ({ id, name }) => {

  const handleJoinSession = () => {
    console.log('Joining a session...')
  }

  return (
    <div className="session">
      <h3 className="session__name">{name}</h3>
      <img className="session__phone" src={phoneIcon} alt="Phone Icon" onClick={handleJoinSession}/>
    </div>
  );
};

export default Session;
