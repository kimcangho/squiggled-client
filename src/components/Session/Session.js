//Styling
import "./Session.scss";

import { useNavigate } from "react-router-dom";
//Assets
import phoneIcon from "../../assets/images/icons/phone.svg";

const Session = ({ name, joinSession }) => {

  const navigate = useNavigate();

  //Join session
  const handleJoinSession = () => {
    navigate(`/session/${name}`)  //Redirect to session URL
    joinSession(name);
  };

  return (
    <div className="session">
      <h3 className="session__name">{name}</h3>
      <img
        className="session__phone"
        src={phoneIcon}
        alt="Phone Icon"
        onClick={handleJoinSession}
      />
    </div>
  );
};

export default Session;
