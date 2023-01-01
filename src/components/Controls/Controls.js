import "./Controls.scss";
//React Hooks
import { useState } from "react";
//Assets
import micOnIcon from "../../assets/images/icons/mic.svg";
import micOffIcon from "../../assets/images/icons/mic-off.svg";
import cameraOnIcon from "../../assets/images/icons/camera-fill.svg";
import cameraOffIcon from "../../assets/images/icons/camera-off.svg";
import screenshotIcon from "../../assets/images/icons/screenshot.svg";
import deleteIcon from "../../assets/images/icons/delete.svg";
import eraseIcon from "../../assets/images/icons/eraser.svg";
import drawIcon from "../../assets/images/icons/draw.svg";
import stampIcon from "../../assets/images/icons/focus.svg";
import downloadIcon from "../../assets/images/icons/download-line.svg";
import canvasIcon from "../../assets/images/icons/artboard.svg";

const Controls = ({ isDrawModeStamp, setIsDrawModeStamp }) => {
  //State Variables
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);

  //Microphone
  const handleAudioToggle = () => {
    setIsAudioOn((isAudioOn) => !isAudioOn);
  };
  //Camera
  const handleVideoToggle = () => {
    setIsVideoOn((isAudioOn) => !isAudioOn);
  };

  //To-do: Toggle Whiteboard - Mobile
  const handleToggleWhiteboard = () => {
    //Toggles whiteboard in mobile
  };

  //Clear entire whiteboard
  const handleClearWhiteboard = () => {
    let canvasArr = document.querySelectorAll(".whiteboard__layer");
    canvasArr.forEach((layer) => {
      let context = layer.getContext("2d");
      context.clearRect(0, 0, layer.width, layer.height);
    });
  };

  //Erase canvas layer
  const handleEraseWhiteboard = () => {
    let canvas = document.querySelector(".whiteboard__layer--me");
    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  //To-do: Stamp/Draw Toggle
  const handleToggleDrawMode = () => {
    setIsDrawModeStamp((isDrawModeStamp) => !isDrawModeStamp);
  };

  //To-do: Download Image from multiple canvases
  const handleDownloadImage = async () => {
    const image = document
      .querySelector(".whiteboard__layer--me")
      .toDataURL("image/png");
    const blob = await (await fetch(image)).blob(); //Fetch canvas image from URL and convert to blob
    const blobURL = URL.createObjectURL(blob); //Create URL for Binary Large Object image
    const link = document.createElement("a");
    link.href = blobURL;
    link.download = "image.png";
    link.click();
  };

  //To-do: Screenshot
  const handleCaptureImage = () => {
    //Capture image from video feed

    //Flash/Capture animation
    let videoFeedElt = document.querySelector(".video-feed");
    videoFeedElt.classList.add("video-feed--captured");
    setTimeout(() => {
      videoFeedElt.classList.remove("video-feed--captured");
    }, 100);
  };

  return (
    <article className="controls">
      <div className="controls__tracks">
        {/* Audio */}
        {isAudioOn ? (
          <div className="controls__button">
            <img
              src={micOnIcon}
              alt="Microphone On Icon"
              className="controls__icon"
              onClick={handleAudioToggle}
            />
          </div>
        ) : (
          <div className="controls__button controls__button--disabled">
            <img
              src={micOffIcon}
              alt="Microphone Off Icon"
              className="controls__icon"
              onClick={handleAudioToggle}
            />
          </div>
        )}
        {/* Video */}
        {isVideoOn ? (
          <div className="controls__button">
            <img
              src={cameraOnIcon}
              alt="Video On Icon"
              className="controls__icon"
              onClick={handleVideoToggle}
            />
          </div>
        ) : (
          <div className="controls__button controls__button--disabled">
            <img
              src={cameraOffIcon}
              alt="Video Off Icon"
              className="controls__icon"
              onClick={handleVideoToggle}
            />
          </div>
        )}
      </div>

      <div className="controls__whiteboard">
        {/* Canvas */}
        <div className="controls__button controls__button--mobile-only">
          <img src={canvasIcon} alt="Canvas Icon" className="controls__icon" />
        </div>
        {/* Delete */}
        <div className="controls__button controls__button--tablet-only">
          <img
            src={deleteIcon}
            alt="Delete Icon"
            className="controls__icon"
            onClick={handleClearWhiteboard}
          />
        </div>
        {/* Erase */}
        <div className="controls__button controls__button--tablet-only">
          <img
            src={eraseIcon}
            alt="Erase Icon"
            className="controls__icon"
            onClick={handleEraseWhiteboard}
          />
        </div>
        {/* Toggle Stamp/Draw */}
        {isDrawModeStamp ? (
          <div className="controls__button controls__button--tablet-only">
            <img
              src={drawIcon}
              alt="Draw Icon"
              className="controls__icon"
              onClick={handleToggleDrawMode}
            />
          </div>
        ) : (
          <div className="controls__button controls__button--tablet-only">
            <img
              src={stampIcon}
              alt="Stamp Icon"
              className="controls__icon"
              onClick={handleToggleDrawMode}
            />
          </div>
        )}
        {/* Download */}
        <div className="controls__button controls__button--tablet-only">
          <img
            src={downloadIcon}
            alt="Download Icon"
            className="controls__icon"
            onClick={handleDownloadImage}
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
