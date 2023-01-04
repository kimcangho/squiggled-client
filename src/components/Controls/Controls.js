import "./Controls.scss";
//React Hooks
import FlipButton from "../FlipButton/FlipButton";
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
import videoIcon from "../../assets/images/icons/video.svg";

const Controls = ({
  setIsDrawModeStamp,
  setIsWhiteboardMobile,
  isAudioOn,
  setIsAudioOn,
  isVideoOn,
  setIsVideoOn,
  isWhiteboardMobile,
}) => {
  //Microphone
  const handleAudioToggle = () => {
    setIsAudioOn((value) => !value);
  };
  //Camera
  const handleVideoToggle = () => {
    setIsVideoOn((value) => !value);
  };

  //To-do: Toggle Whiteboard - Mobile
  const handleToggleWhiteboard = () => {
    console.log("Flip it!");
    //Toggles whiteboard in mobile
    setIsWhiteboardMobile((value) => !value);
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

  // Stamp/Draw Toggle
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
    //Toggle whiteboard if in mobile breakpoint
    if (window.innerWidth < 768 && !isWhiteboardMobile)
      handleToggleWhiteboard();

    //Capture image from video feed
    console.log("captured");

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
        <FlipButton
          frontButton={canvasIcon}
          backButton={videoIcon}
          handleTrigger={handleToggleWhiteboard}
          isMobile={true}
        />
        {/* Canvas */}
        {/* <div className="controls__button controls__button--mobile-only">
          <img
            src={canvasIcon}
            alt="Canvas Icon"
            className="controls__icon"
            onClick={handleToggleWhiteboard}
          />
        </div> */}
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

        <FlipButton
          frontButton={stampIcon}
          backButton={drawIcon}
          handleTrigger={handleToggleDrawMode}
          isMobile={false}
        />

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
