import "./Footer.scss";

import muteIcon from "../../assets/images/icons/volume-mute-line.svg";
import unmuteIcon from "../../assets/images/icons/volume-up-line.svg";
import cameraIcon from "../../assets/images/icons/camera-fill.svg";
import closeCircleIcon from "../../assets/images/icons/close-circle-line.svg";
import downloadIcon from "../../assets/images/icons/download-line.svg";
import drawIcon from "../../assets/images/icons/draw.svg";

const Footer = ({
  myUserId,
  session,
  handleExitCapture,
  photoCaptured,
  handleCaptureImage,
  toggleMute,
  isMuted,
  handleCreateSession,
  handleEndSession,
  activeCall,
}) => {
  //Download Image from Canvas
  const handleDownloadImage = async (event) => {
    if (photoCaptured) {
      event.preventDefault(); //Prevent redirect
      const canvas = document.querySelector(".canvas"); //DOM manipulation
      const image = canvas.toDataURL("image/png"); //Convert canvas element to URL
      const blob = await (await fetch(image)).blob(); //Fetch canvas image from URL and convert to blob
      const blobURL = URL.createObjectURL(blob); //Create URL for Binary Large Object image
      const link = document.createElement("a"); //Create unmounted anchor tag
      link.href = blobURL; //Set href of unmounted anchor tag
      link.download = "image.png"; //Define image download format
      link.click(); //Trigger link with programmatic click
    }
  };

  return (
    <footer className="home__footer">
      <div className="home__canvas-buttons">
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
          onClick={() => handleEndSession(session)}
        >
          <h2 className="home__call-text">End Session</h2>
        </div>
      ) : (
        <div
          className="home__session home__session--create"
          onClick={handleCreateSession}
        >
          <h2 className="home__call-text">New Session</h2>
        </div>
      )}

      <div className="home__canvas-buttons">
        {/* Close Download Button */}
        <img
          className={`home__button ${
            !photoCaptured && "home__button--inactive"
          }`}
          src={closeCircleIcon}
          alt="Close Circle Icon"
          onClick={handleExitCapture}
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
