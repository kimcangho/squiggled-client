import "./Heading.scss";
import { useNavigate } from "react-router";
//Assets
import squiggledLogo from "../../assets/images/logos/squiggled-logo.svg";
// import userIcon from "../../assets/images/icons/user.svg";

const Heading = ({ inRoom, setInRoom }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    setInRoom(false);
    document.querySelector(".setup").classList.add("setup--exit");
    setTimeout(() => {
      navigate("/");
    }, 750);
  };

  return (
    <div className="heading">
      <img
        src={squiggledLogo}
        alt="Squiggled Logo"
        className="heading__logo"
        onClick={handleRedirect}
      />
      <div className="heading__prompt">
        {inRoom ? (
          <h5 className="heading__title">In a session</h5>
        ) : (
          <>
            <h5 className="heading__title">Get Started</h5>
            <p className="heading__body">Setup your audio and video</p>
          </>
        )}
      </div>
      {/* <div className="heading__avatar">
        <img
          src={userIcon}
          alt="Avatar Icon"
          className="heading__avatar-icon"
        />
      </div> */}
    </div>
  );
};

export default Heading;
