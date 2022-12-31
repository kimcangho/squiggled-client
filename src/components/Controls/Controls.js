import "./Controls.scss";

//Assets
import micIcon from "../../assets/images/icons/mic.svg";
import cameraOffIcon from "../../assets/images/icons/camera-off.svg";
import screenshotIcon from "../../assets/images/icons/screenshot.svg";

const Controls = () => {
  return (
    <article className="controls">
      <div className="controls__tracks">
        <div className="controls__button">
          <img src={micIcon} alt="Microphone Icon" className="controls__icon" />
        </div>
        <div className="controls__button controls__button--disabled">
          <img
            src={cameraOffIcon}
            alt="Video Off Icon"
            className="controls__icon"
          />
        </div>
      </div>
      <div className="controls__button">
        <img
          src={screenshotIcon}
          alt="Microphone Icon"
          className="controls__icon"
        />
      </div>
    </article>
  );
};

export default Controls;
