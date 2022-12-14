import "./Footer.scss";

import drawIcon from "../../assets/images/icons/draw.svg";
import eraserIcon from '../../assets/images/icons/eraser.svg'
import muteIcon from "../../assets/images/icons/volume-mute-line.svg";
import unmuteIcon from "../../assets/images/icons/volume-up-line.svg";
import sendIcon from '../../assets/images/icons/send-plane.svg';
import downloadIcon from "../../assets/images/icons/download-line.svg";
import cameraIcon from "../../assets/images/icons/camera-fill.svg";

const Footer = ({
  myUserID,
  sessionID,
  handleExitCapture,
  photoCaptured,
  handleCaptureImage,
  toggleMute,
  isMuted,
  handleCreateSession,
  handleEndSession,
  activeCall,
  peerID,
  socket,
  handleClearCanvas,
}) => {
  //Download Image from Canvas

  const handleDownloadImage = async (event) => {
    if (photoCaptured) {
      event.preventDefault(); //Prevent redirect
      // console.log(socket);
      // console.log(session);
      const canvas = document.querySelector(".canvas"); //DOM manipulation
      const image = canvas.toDataURL("image/png"); //Convert canvas element to URL
      const blob = await (await fetch(image)).blob(); //Fetch canvas image from URL and convert to blob
      const blobURL = URL.createObjectURL(blob); //Create URL for Binary Large Object image
      const link = document.createElement("a"); //Create unmounted anchor tag
      link.href = blobURL; //Set href of unmounted anchor tag
      link.download = "image.png"; //Define image download format
      link.click(); //Trigger link with programmatic click
      if (!!sessionID) {
        //if session is running
        socket.emit("send_screenshot", image, sessionID);
      }
    }
  };

  const handleSendImage = () => {
    if (!!sessionID) {
      //if session is running
      const canvas = document.querySelector(".canvas"); //DOM manipulation
      const image = canvas.toDataURL("image/png"); //Convert canvas element to URL
      socket.emit("send_screenshot", image, sessionID);
    }
  }

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
        {/* Draw Mode */}
        <img
          className={`home__button ${
            photoCaptured
              ? "home__button--auto-selected"
              : "home__button--inactive"
          }`}
          src={drawIcon}
          alt="DrawIcon"
        />
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

      {/* Session Button */}
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
            !photoCaptured  && "home__button--inactive"
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
