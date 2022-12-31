import "./Controls.scss";

//Assets
import micIcon from "../../assets/images/icons/mic.svg";
import micOffIcon from "../../assets/images/icons/mic-off.svg";
import cameraOffIcon from "../../assets/images/icons/camera-off.svg";
import screenshotIcon from "../../assets/images/icons/screenshot.svg";
import deleteIcon from "../../assets/images/icons/delete.svg";
import eraseIcon from "../../assets/images/icons/eraser.svg";
import drawIcon from "../../assets/images/icons/draw.svg";
import downloadIcon from "../../assets/images/icons/download-line.svg";
import canvasIcon from "../../assets/images/icons/artboard.svg";

const Controls = () => {
  const handleCaptureImage = () => {
    let videoFeedElt = document.querySelector(".video-feed");
    videoFeedElt.classList.add("video-feed--captured");
    setTimeout(() => {
      videoFeedElt.classList.remove("video-feed--captured");
    }, 100);
  };

  return (
    <article className="controls">
      <div className="controls__tracks">
        <div className="controls__button controls__button--disabled">
          <img
            src={micOffIcon}
            alt="Microphone Off Icon"
            className="controls__icon"
          />
        </div>
        <div className="controls__button controls__button--disabled">
          <img
            src={cameraOffIcon}
            alt="Video Off Icon"
            className="controls__icon"
          />
        </div>
      </div>

      <div className="controls__whiteboard">
        {/* Canvas */}
        <div className="controls__button controls__button--mobile-only">
          <img src={canvasIcon} alt="Canvas Icon" className="controls__icon" />
        </div>

        {/* Delete */}
        <div className="controls__button controls__button--tablet-only">
          <img src={deleteIcon} alt="Delete Icon" className="controls__icon" />
        </div>
        {/* Erase */}
        <div className="controls__button controls__button--tablet-only">
          <img
            src={eraseIcon}
            alt="Erase Icon"
            className="controls__icon"
            onClick={handleCaptureImage}
          />
        </div>
        {/* Toggle Stamp/Draw */}
        <div className="controls__button controls__button--tablet-only">
          <img
            src={drawIcon}
            alt="Stamp/Draw Icon"
            className="controls__icon"
          />
        </div>

        {/* Download */}
        <div className="controls__button controls__button--tablet-only">
          <img
            src={downloadIcon}
            alt="Download Icon"
            className="controls__icon"
          />
        </div>
        {/* Capture Screenshot */}
        <div className="controls__button">
          <img
            src={screenshotIcon}
            alt="Screenshot Icon"
            className="controls__icon"
            onClick={handleCaptureImage}
          />
        </div>
      </div>
    </article>
  );
};

export default Controls;
