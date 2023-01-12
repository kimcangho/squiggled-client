//Styling
import "./Controls.scss";
//React Hooks
import { useContext } from "react";
import { RoomContext } from "../../context/roomContext";
import Tippy from "@tippyjs/react";
//Component
import FlipButton from "../FlipButton/FlipButton";
//Assets
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
  isVideoOn,
  setIsVideoOn,
  isWhiteboardMobile,
  isCaptureLayerActive,
  setIsCaptureLayerActive,
  setIsDrawLayerActive,
  isDrawLayerActive,
  screenshotCaptured,
  setScreenshotCaptured,
}) => {
  const { ws, roomId, stream, setStream } = useContext(RoomContext);

  //Camera
  const handleVideoToggle = () => {
    if (!isVideoOn) {
      // Get Video Stream
      const getMedia = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" },
            audio: false,
          });
          setStream(stream);
        } catch (error) {
          console.log(error);
        }
      };

      getMedia();
    } else {
      const tracks = stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    }

    setIsVideoOn((value) => !value);
  };
  //Whiteboard
  const handleToggleWhiteboard = () => {
    setIsWhiteboardMobile((value) => !value);
  };
  //Clear entire whiteboard
  const handleClearWhiteboard = () => {
    if (!isCaptureLayerActive && !isDrawLayerActive) return;

    let canvasArr = document.querySelectorAll(".whiteboard__layer");
    canvasArr.forEach((layer) => {
      let context = layer.getContext("2d");
      context.clearRect(0, 0, layer.width, layer.height);
    });
    setIsCaptureLayerActive(false);
    setIsDrawLayerActive(false);

    if (roomId) {
      ws.emit("send-clear", roomId);
    }
  };
  //Erase canvas layer
  const handleEraseWhiteboard = () => {
    if (!isDrawLayerActive) return;

    const canvas = document.querySelector(".whiteboard__layer--me");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    setIsDrawLayerActive(false);
    if (screenshotCaptured && !isCaptureLayerActive) {
      setIsCaptureLayerActive(false);
    }
    if (roomId) {
      ws.emit("send-erase", roomId);
    }
  };
  // Stamp/Draw Toggle
  const handleToggleDrawMode = () => {
    setIsDrawModeStamp((isDrawModeStamp) => !isDrawModeStamp);
  };
  //Download Whiteboard Image
  const handleDownloadImage = async () => {
    if (!isCaptureLayerActive && !isDrawLayerActive) return;
    //Get canvases
    const canvases = document.querySelectorAll(".whiteboard__layer"); //Select all canvases
    const captureCanvas = canvases[0];
    const drawCanvas = canvases[1];
    //Combine canvas elements
    const virtualCanvas = document.createElement("canvas");
    const virtualContext = virtualCanvas.getContext("2d");
    virtualCanvas.width = captureCanvas.offsetWidth;
    virtualCanvas.height = captureCanvas.offsetHeight;
    virtualContext.drawImage(
      captureCanvas,
      0,
      0,
      captureCanvas.width,
      captureCanvas.height
    );
    virtualContext.drawImage(
      drawCanvas,
      0,
      0,
      drawCanvas.width,
      drawCanvas.height
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

  //To-do: Resize Screenshot
  const handleCaptureImage = async () => {
    //Check if video is on
    if (!isVideoOn) return;
    //Toggle whiteboard if in mobile breakpoint
    if (window.innerWidth < 768 && !isWhiteboardMobile) {
      handleToggleWhiteboard();

      setIsVideoOn((value) => !value);
    }

    //Capture image from video feed
    let videoFeedElt = document.querySelector(".video-feed__webcam");
    const canvas = document.querySelector(".whiteboard__layer");
    let context = canvas.getContext("2d");

    await context.drawImage(
      videoFeedElt,
      0,
      0,
      videoFeedElt.videoWidth,
      videoFeedElt.videoHeight,
      0,
      0,
      canvas.offsetWidth,
      canvas.offsetHeight
    );

    //Emit event to peer
    if (roomId) {
      const drawnImage = await canvas.toDataURL("image/png");
      ws.emit("send-screenshot", roomId, drawnImage);
    }

    //Shutter Animation
    videoFeedElt.classList.add("video-feed--captured");
    setTimeout(() => {
      videoFeedElt.classList.remove("video-feed--captured");
    }, 100);
    //Reset states
    setScreenshotCaptured(true);
    setIsCaptureLayerActive(true);
  };

  //Socket Listener Functions
  const transmitErase = () => {
    const canvas = document.querySelector(".whiteboard__layer--me");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    setIsDrawLayerActive(false);
    if (screenshotCaptured && !isCaptureLayerActive) {
      setIsCaptureLayerActive(false);
    }
  };
  const transmitClear = () => {
    if (!isCaptureLayerActive && !isDrawLayerActive) return;

    let canvasArr = document.querySelectorAll(".whiteboard__layer");
    canvasArr.forEach((layer) => {
      let context = layer.getContext("2d");
      context.clearRect(0, 0, layer.width, layer.height);
    });
    setIsCaptureLayerActive(false);
    setIsDrawLayerActive(false);
  };
  const transmitScreenshot = (data) => {
    let newImg = new Image();
    newImg.addEventListener(
      "load",
      () => {
        const canvas = document.querySelector(".whiteboard__layer");
        let context = canvas.getContext("2d");
        context.drawImage(newImg, 0, 0, canvas.width, canvas.height);
      },
      false
    );
    newImg.src = data;

    setIsCaptureLayerActive(true);
  };
  const transmitWhiteboard = (data) => {
    let newImg = new Image();
    newImg.addEventListener(
      "load",
      () => {
        const canvas = document.querySelector(".whiteboard__layer--me");
        let context = canvas.getContext("2d");
        context.drawImage(newImg, 0, 0, canvas.width, canvas.height);
      },
      false
    );
    newImg.src = data;

    setIsDrawLayerActive(true);
  };
  //Socket Listeners
  ws.on("transmit-erase", transmitErase);
  ws.on("transmit-clear", transmitClear);
  ws.on("transmit-screenshot", transmitScreenshot);
  ws.on("transmit-whiteboard", transmitWhiteboard);

  return (
    <article className="controls">
      <div className="controls__tracks">
        {/* Video */}
        {isVideoOn ? (
          <Tippy
            content="Turn Video Off"
            trigger="mouseenter focus"
            placement="top"
            duration="0"
            disabled={!isVideoOn}
          >
            <div className="controls__button">
              <img
                src={cameraOnIcon}
                alt="Video On Icon"
                className="controls__icon"
                onClick={handleVideoToggle}
              />
            </div>
          </Tippy>
        ) : (
          <Tippy
            content="Turn Video On"
            trigger="mouseenter focus"
            placement="top"
            duration="0"
            disabled={isVideoOn}
          >
            <div className="controls__button controls__button--disabled">
              <img
                src={cameraOffIcon}
                alt="Video Off Icon"
                className="controls__icon"
                onClick={handleVideoToggle}
              />
            </div>
          </Tippy>
        )}
      </div>

      <div className="controls__whiteboard">
        {/* Canvas/Video in Mobile */}
        <div className="controls__button controls__button--mobile-only">
          {isWhiteboardMobile ? (
            <img
              src={videoIcon}
              alt="Canvas Icon"
              className="controls__icon"
              onClick={handleToggleWhiteboard}
            />
          ) : (
            <img
              src={canvasIcon}
              alt="Canvas Icon"
              className="controls__icon"
              onClick={handleToggleWhiteboard}
            />
          )}
        </div>

        {/* Delete */}
        <Tippy
          content="Clear Screenshot"
          trigger="mouseenter focus"
          placement="top"
          duration="0"
          disabled={!isCaptureLayerActive}
        >
          <div
            className={`controls__button ${
              !isCaptureLayerActive && "controls__button--offline"
            }`}
          >
            <img
              src={deleteIcon}
              alt="Delete Icon"
              className="controls__icon"
              onClick={handleClearWhiteboard}
            />
          </div>
        </Tippy>
        {/* Erase */}
        <Tippy
          content="Erase Drawing"
          trigger="mouseenter focus"
          placement="top"
          duration="0"
          disabled={!isDrawLayerActive}
        >
          <div
            className={`controls__button ${
              !isDrawLayerActive && "controls__button--offline"
            }`}
          >
            <img
              src={eraseIcon}
              alt="Erase Icon"
              className="controls__icon"
              onClick={handleEraseWhiteboard}
            />
          </div>
        </Tippy>

        {/* Toggle Stamp/Draw */}
        <FlipButton
          frontButton={stampIcon}
          backButton={drawIcon}
          handleTrigger={handleToggleDrawMode}
          isMobile={false}
        />

        {/* Download */}
        <Tippy
          content="Download Whiteboard"
          trigger="mouseenter focus"
          placement="top"
          duration="0"
          disabled={!isCaptureLayerActive && !isDrawLayerActive}
        >
          <div
            className={`controls__button ${
              !isCaptureLayerActive &&
              !isDrawLayerActive &&
              "controls__button--offline"
            }`}
          >
            <img
              src={downloadIcon}
              alt="Download Icon"
              className="controls__icon"
              onClick={handleDownloadImage}
            />
          </div>
        </Tippy>
        {/* Capture Screenshot */}
        <Tippy
          content="Take Screenshot"
          trigger="mouseenter focus"
          placement="top"
          duration="0"
          disabled={!isVideoOn}
        >
          <div
            className={`controls__button ${
              !isVideoOn && "controls__button--offline"
            }`}
          >
            <img
              src={screenshotIcon}
              alt="Screenshot Icon"
              className="controls__icon"
              onClick={handleCaptureImage}
            />
          </div>
        </Tippy>
      </div>
    </article>
  );
};

export default Controls;
