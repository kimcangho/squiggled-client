//Styling
import "./SetupPage.scss";
//React Hooks
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
//Context
import { RoomContext } from "../../context/roomContext";
//Components
import Heading from "../../components/Heading/Heading";
import VideoFeed from "../../components/VideoFeed/VideoFeed";
import Whiteboard from "../../components/Whiteboard/Whiteboard";
import Controls from "../../components/Controls/Controls";
import StartSessionForm from "../../components/StartSessionForm/StartSessionForm";

const SetupPage = () => {
  //State Variables
  const [isDrawMode, setIsDrawModeStamp] = useState(false);
  const [isWhiteboardMobile, setIsWhiteboardMobile] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isMobileView, setIsMobileView] = useState(true);
  //Active layers
  const [isCaptureLayerActive, setIsCaptureLayerActive] = useState(false);
  const [isDrawLayerActive, setIsDrawLayerActive] = useState(false);
  const [screenshotCaptured, setScreenshotCaptured] = useState(false);

  //Room parameters
  const { id } = useParams();
  const { ws, myUsername, setMyUsername, stream, inRoom, setInRoom } =
    useContext(RoomContext);

  //Join Room Useeffect
  useEffect(() => {
    //Check for room id and user state
    if (id) { //me
      //Join room with roomId and peerId
      setInRoom(true);
      ws.emit("join-room", { roomId: id });
    }
  }, [id, ws, setInRoom]);

  //Initial window size useEffect
  useEffect(() => {
    //Draw original image back
    if (window.innerWidth >= 768) {
      setIsWhiteboardMobile(false);
      setIsMobileView(true);
    } else {
      setIsMobileView(false);
    }

    //Set initial canvas dimensions
    const vid = document.querySelector(".video-feed");
    const canvases = document.querySelectorAll(".whiteboard__layer");
    canvases.forEach((canvas) => {
      canvas.width = vid.offsetWidth;
      canvas.height = vid.offsetHeight;
    });

    if (window.innerWidth < 768) {
      setIsMobileView(false);
    } else {
      setIsMobileView(true);
    }
  }, []);

  //Functions
  const handleUsernameChange = (event) => {
    if (event.target.value.length > 0) {
      document
        .querySelector(".startSessionForm__input")
        .classList.remove("startSessionForm__input--error");
    }
    setMyUsername(event.target.value);
  };

  const resize = () => {
    //Window Resizing
    const canvases = document.querySelectorAll(".whiteboard__layer");

    canvases.forEach((canvas) => {
      const context = canvas.getContext("2d");
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      context.width = canvas.offsetWidth;
      context.height = canvas.offsetHeight;
    });
  };

  window.onresize = async () => {
    resize();
    if (window.innerWidth >= 768) {
      setIsWhiteboardMobile(false);
      setIsMobileView(true);
    } else {
      setIsMobileView(false);
    }
  };

  return (
    <section className="setup">
      <main className="setup__main">
        <Heading inRoom={inRoom} setInRoom={setInRoom} />
        <div className="setup__container">
          <div className="flip-stream">
            <div className="flip-stream__container">
              <CSSTransition
                in={!isWhiteboardMobile}
                timeout={300}
                classNames="flip-stream__flip"
              >
                <div className="flip-stream__card">
                  {/* Video Feed */}
                  <VideoFeed
                    isVideoOn={isVideoOn}
                    myUsername={myUsername}
                    stream={stream}
                  />
                  {/* Shared Whiteboard */}
                  <Whiteboard
                    isDrawMode={isDrawMode}
                    isMobile={true}
                    isMobileView={isMobileView}
                    setIsCaptureLayerActive={setIsCaptureLayerActive}
                    setIsDrawLayerActive={setIsDrawLayerActive}
                  />
                </div>
              </CSSTransition>
            </div>
          </div>
        </div>

        <Controls
          setIsDrawModeStamp={setIsDrawModeStamp}
          isWhiteboardMobile={isWhiteboardMobile}
          setIsWhiteboardMobile={setIsWhiteboardMobile}
          isVideoOn={isVideoOn}
          setIsVideoOn={setIsVideoOn}
          isCaptureLayerActive={isCaptureLayerActive}
          setIsCaptureLayerActive={setIsCaptureLayerActive}
          isDrawLayerActive={isDrawLayerActive}
          setIsDrawLayerActive={setIsDrawLayerActive}
          screenshotCaptured={screenshotCaptured}
          setScreenshotCaptured={setScreenshotCaptured}
        />

        <StartSessionForm
          myUsername={myUsername}
          handleUsernameChange={handleUsernameChange}
          inRoom={inRoom}
          setInRoom={setInRoom}
        />
      </main>
    </section>
  );
};

export default SetupPage;
