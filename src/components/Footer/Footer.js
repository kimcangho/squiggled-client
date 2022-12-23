import "./Footer.scss";
//React Hooks
import { useContext } from "react";
import { SocketContext } from "../../utilities/contexts/SocketContext";
//Assets
import drawIcon from "../../assets/images/icons/draw.svg";
import stampIcon from "../../assets/images/icons/focus.svg";
import eraserIcon from "../../assets/images/icons/eraser.svg";
import muteIcon from "../../assets/images/icons/volume-mute-line.svg";
import unmuteIcon from "../../assets/images/icons/volume-up-line.svg";
import sendIcon from "../../assets/images/icons/send-plane.svg";
import downloadIcon from "../../assets/images/icons/download-line.svg";
import cameraIcon from "../../assets/images/icons/camera-fill.svg";

const Footer = () => {
  //SocketContext
  const {
    activeCall,
    isMuted,
    photoCaptured,
    myUserID,
    peerID,
    sessionID,
    canvas,
    socketConnection,
    toggleMute,
    handleCaptureImage,
    handleExitCapture,
    handleClearCanvas,
    handleCreateSession,
    handleEndSession,
    marking,
    toggleMarking,
  } = useContext(SocketContext);

  //State Variables
  // const [marking, setMarking] = useState(true);

  //Download Image from Canvas
  const handleDownloadImage = async (event) => {
    if (photoCaptured) {
      event.preventDefault(); //Prevent redirect
      const image = canvas.current.toDataURL("image/png");
      const blob = await (await fetch(image)).blob(); //Fetch canvas image from URL and convert to blob
      const blobURL = URL.createObjectURL(blob); //Create URL for Binary Large Object image
      const link = document.createElement("a");
      link.href = blobURL;
      link.download = "image.png";
      link.click();
    }
  };

  //Send image from canvas
  const handleSendImage = () => {
    if (!!sessionID) {
      const image = canvas.current.toDataURL("image/png");
      socketConnection.current.emit("send_screenshot", image, sessionID);
    }
  };

  //Exit capture mode and clear canvas
  const handleClearClose = () => {
    if (photoCaptured) {
      handleExitCapture();
      handleClearCanvas();
    }
  };

  return (
    <footer className="home__footer">
      <div className="home__canvas-buttons">
        {/* Clear Canvas */}
        <img
          className={`home__button ${
            !photoCaptured && "home__button--inactive"
          }`}
          src={eraserIcon}
          alt="Close Circle Icon"
          onClick={handleClearClose}
        />
        {!marking ? (
          // Drawing Mode
          <img
            className={`home__button ${
              photoCaptured
                ? "home__button--auto-selected"
                : "home__button--inactive"
            }`}
            src={drawIcon}
            alt="DrawIcon"
            onClick={toggleMarking}
          />
        ) : (
          // Stamping Mode
          <img
            className={`home__button ${
              photoCaptured
                ? "home__button--auto-selected"
                : "home__button--inactive"
            }`}
            src={stampIcon}
            alt="DrawIcon"
            onClick={toggleMarking}
          />
        )}

        {/* Mute/Unmute Button */}
        {isMuted ? (
          <img
            className="home__button"
            src={unmuteIcon}
            alt="Unmute Icon"
            onClick={toggleMute}
          />
        ) : (
          <img
            className="home__button"
            src={muteIcon}
            alt="Mute Icon"
            onClick={toggleMute}
          />
        )}
      </div>

      {/* New/End Session Button */}
      {activeCall ? (
        <div
          className="home__session home__session--end"
          onClick={() => handleEndSession(sessionID, myUserID, peerID)}
        >
          <h2 className="home__call-text">End Session</h2>
        </div>
      ) : (
        <div
          className="home__session home__session--create"
          onClick={() => handleCreateSession(myUserID)}
        >
          <h2 className="home__call-text">New Session</h2>
        </div>
      )}

      <div className="home__canvas-buttons">
        {/* Send Button */}
        <img
          className={`home__button ${
            !photoCaptured && "home__button--inactive"
          }`}
          src={sendIcon}
          alt="Send Icon"
          onClick={handleSendImage}
        />
        {/* Download Button */}
        <img
          className={`home__button ${
            !photoCaptured && "home__button--inactive"
          }`}
          src={downloadIcon}
          alt="Download Icon"
          onClick={handleDownloadImage}
        />
        {/* Capture Image Button */}
        <img
          className="home__button"
          src={cameraIcon}
          alt="Camera Icon"
          onClick={handleCaptureImage}
        />
      </div>
    </footer>
  );
};

export default Footer;
