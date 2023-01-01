import "./Heading.scss";
//Assets
import squiggledLogo from "../../assets/images/logos/squiggled-logo.svg";
// import userIcon from "../../assets/images/icons/user.svg";

const Heading = () => {
  return (
    <div className="heading">
      <img src={squiggledLogo} alt="Squiggled Logo" className="heading__logo" />
      <div className="heading__prompt">
        <h5 className="heading__title">Get Started</h5>
        <p className="heading__body">Setup your audio and video</p>
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
