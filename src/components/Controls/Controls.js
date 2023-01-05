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
    let canvas;
    let canvases = document.querySelectorAll(".whiteboard__layer--me");
    if (window.innerWidth < 768) {
      canvas = canvases[0]; //Mobile
    } else {
      canvas = canvases[1]; //Non-mobile
    }
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Stamp/Draw Toggle
  const handleToggleDrawMode = () => {
    setIsDrawModeStamp((isDrawModeStamp) => !isDrawModeStamp);
  };

  //To-do: Download Image from multiple canvases by putting all on a virtual canvas
  const handleDownloadImage = async () => {
    const canvases = document.querySelectorAll(".whiteboard__layer"); //Select all canvases
    let firstCanvas, firstContext, secondCanvas, secondContext; //Declare canvases and contexts
    //Mobile view - canvas 0 and 1
    if (window.innerWidth < 768) {
      firstCanvas = canvases[0];
      firstContext = firstCanvas.getContext("2d");
      secondCanvas = canvases[1];
      secondContext = secondCanvas.getContext("2d");
      //Non-mobile view - canvas 2 and 3
    } else {
      firstCanvas = canvases[2];
      firstContext = firstCanvas.getContext("2d");
      secondCanvas = canvases[3];
      secondContext = secondCanvas.getContext("2d");
    }
    //Combine canvas contexts
    const virtualCanvas = document.createElement("canvas");
    const virtualContext = virtualCanvas.getContext("2d");
    virtualContext.drawImage(
      firstCanvas,
      0,
      0,
      firstCanvas.width,
      firstCanvas.height
    );
    virtualContext.drawImage(
      secondCanvas,
      0,
      0,
      secondCanvas.width,
      secondCanvas.height
    );
    //Convert to image
    const virtualImage = virtualCanvas.toDataURL("image/png");
    const blob = await (await fetch(virtualImage)).blob(); //Fetch canvas image from URL and convert to blob
    const blobURL = URL.createObjectURL(blob); //Create URL for Binary Large Object image
    const link = document.createElement("a");
    link.href = blobURL;
    link.download = "image.png";
    link.click();
  };

  //To-do: Screenshot
  const handleCaptureImage = async () => {
    //Check if video is on
    if (!isVideoOn) return;
    //Toggle whiteboard if in mobile breakpoint
    if (window.innerWidth < 768 && !isWhiteboardMobile)
      handleToggleWhiteboard();
    //Capture image from video feed
    let videoFeedElt = document.querySelector(".video-feed__webcam");
    console.log(videoFeedElt.videoWidth, videoFeedElt.videoHeight);
    let videoContainerElt = document.querySelector(
      ".video-feed__video-container"
    );
    console.log(videoContainerElt.offsetWidth);
    const canvases = document.querySelectorAll(".whiteboard__layer");
    const canvasArr = [canvases[0], canvases[2]];
    canvasArr.forEach((canvas) => {
      console.log(canvas.width, canvas.height);
      let ctx = canvas.getContext("2d");
      ctx.drawImage(
        videoFeedElt,
        0,
        0,
        videoFeedElt.videoWidth,
        videoFeedElt.videoHeight,
        // 0,
        // 0,
        // videoContainerElt.offsetWidth,
        // videoContainerElt.offsetHeight,
        0,
        0,
        canvas.width,
        canvas.height
      );
    });
    //Flash/Capture animation
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
        {/* Canvas/Video in Mobile */}
        <FlipButton
          frontButton={canvasIcon}
          backButton={videoIcon}
          handleTrigger={handleToggleWhiteboard}
          isMobile={true}
        />

        {/* Delete */}
        <div className="controls__button">
          <img
            src={deleteIcon}
            alt="Delete Icon"
            className="controls__icon"
            onClick={handleClearWhiteboard}
          />
        </div>
        {/* Erase */}
        <div className="controls__button">
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
        <div className="controls__button">
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
