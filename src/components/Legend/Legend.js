//Styling
import "./Legend.scss";
//Assets
import drawIcon from "../../assets/images/icons/draw.svg";
import eraserIcon from "../../assets/images/icons/eraser.svg";
import muteIcon from "../../assets/images/icons/volume-mute-line.svg";
import unmuteIcon from "../../assets/images/icons/volume-up-line.svg";
import sendIcon from "../../assets/images/icons/send-plane.svg";
import downloadIcon from "../../assets/images/icons/download-line.svg";
import cameraIcon from "../../assets/images/icons/camera-fill.svg";

const Legend = () => {
  return (
    <div className="legend">
      <h2 className="legend__tip-title">Legend</h2>

      <div className="legend__tip-box">
        <img src={cameraIcon} alt="Camera Icon" className="legend__icon" />
        <p>Take screenshot</p>
      </div>

      <div className="legend__tip-box">
        <img src={sendIcon} alt="Send Icon" className="legend__icon" />
        <p>Send screenshot</p>
      </div>

      <div className="legend__tip-box">
        <img src={downloadIcon} alt="Download Icon" className="legend__icon" />
        <p>Download screenshot</p>
      </div>

      <div className="legend__tip-box">
        <img src={drawIcon} alt="Draw Icon" className="legend__icon" />
        <p>Draw mode enabled</p>
      </div>

      <div className="legend__tip-box">
        <img src={eraserIcon} alt="Eraser Icon" className="legend__icon" />
        <p>Clear screenshot</p>
      </div>

      <div className="legend__tip-box">
        <img src={muteIcon} alt="Muted Icon" className="legend__icon" />
        <p>Muted</p>
      </div>

      <div className="legend__tip-box">
        <img src={unmuteIcon} alt="Unmuted Icon" className="legend__icon" />
        <p>Unmuted</p>
      </div>
    </div>
  );
};

export default Legend;
