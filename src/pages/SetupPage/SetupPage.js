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
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isMobileView, setIsMobileView] = useState(true);
  //Active layers
  const [isCaptureLayerActive, setIsCaptureLayerActive] = useState(false);
  const [isDrawLayerActive, setIsDrawLayerActive] = useState(false);
  const [screenshotCaptured, setScreenshotCaptured] = useState(false);

  //Room parameters
  const { id } = useParams();
  const {
    ws,
    me,
    myUsername,
    setMyUsername,
    stream,
    // peers,
    inRoom,
    setInRoom,
  } = useContext(RoomContext);

  //Join Room Useeffect
  useEffect(() => {
    console.log(id);
    //Check for room id and user state
    if (id && me) {
      //Join room with roomId and peerId
      console.log("joining room " + id);
      setInRoom(true);
      ws.emit("join-room", { roomId: id, peerId: me.id });
    }
  }, [id, me, ws, setInRoom]);

  //Initial window size useEffect
  useEffect(() => {
    resize();
    if (window.innerWidth < 768) {
      setIsMobileView(false);
    } else {
      setIsMobileView(true);
    }
  }, []);

  //Functions
  const handleUsernameChange = (event) => {
    setMyUsername(event.target.value);
  };

  const resize = () => {
    //Window Resizing
    const canvases = document.querySelectorAll(".whiteboard__layer");
    canvases.forEach((canvas) => {
      // console.log(canvas.width, canvas.height);
      const context = canvas.getContext("2d");
      // console.log(context.width, context.height);
      canvas.width = 480;
      canvas.height = 480;
      // console.log(context.width, context.height);
      context.width = canvas.width;
      context.height = canvas.height;
      // canvas.getContext('2d').scale(2,2);
      // console.log(context.width, context.height);
    });
  };

  window.onresize = () => {
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
        {/* To-do: Set My Video Feed if broadcasting */}
        <div className="setup__container">
          <div className="flip-stream">
            <div className="flip-stream__container">
              <CSSTransition
                in={!isWhiteboardMobile}
                timeout={300}
                classNames="flip-stream__flip"
              >
                <div className="flip-stream__card">
                  {/* Broadcasting Feed from Host */}
                  <VideoFeed
                    isVideoOn={isVideoOn}
                    isAudioOn={isAudioOn}
                    myUsername={myUsername}
                    stream={stream}
                  />
                  {/* Viewer Feed from Host */}
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

          {/* To-do: Set Peer Video Feed if viewing */}
          {/* {Object.values(peers).map((peer) => {
            console.log(peers.participants);
            return (
            
              <div className="video-feed">
              <VideoFeed
                isVideoOn={isVideoOn}
                myUsername="Test"
                stream={peer.stream}
              />
              </div>
            );
          })} */}
        </div>

        <Controls
          setIsDrawModeStamp={setIsDrawModeStamp}
          isWhiteboardMobile={isWhiteboardMobile}
          setIsWhiteboardMobile={setIsWhiteboardMobile}
          isAudioOn={isAudioOn}
          setIsAudioOn={setIsAudioOn}
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
