//Styling
import "./LandingPage.scss";
//React Hooks
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { RoomContext } from "../../context/roomContext";
//Components
import Heading from "../../components/Heading/Heading";
import VideoFeed from "../../components/VideoFeed/VideoFeed";
import Whiteboard from "../../components/Whiteboard/Whiteboard";
import Controls from "../../components/Controls/Controls";
import StartSessionForm from "../../components/StartSessionForm/StartSessionForm";
//Assets
import canvasIcon from "../../assets/images/icons/artboard.svg";

const LandingPage = () => {
  //State Variables
  const [username, setUsername] = useState("");
  const [isDrawMode, setIsDrawModeStamp] = useState(false);
  const [isMobileWhiteboardOn, setIsMobileWhiteboardOn] = useState(false);
  const [isMobileView, setIsMobileView] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);

  //Room parameters
  const { id } = useParams();
  const { ws, me, stream, peers } = useContext(RoomContext);

  useEffect(() => {
    if (window.innerHeight >= 768) {
      console.log("windo");
      setIsMobileView(false);
    }
  }, []);

  //Join Room Useeffect
  useEffect(() => {
    //Check for room id and user state
    if (id && me) {
      //Join room with roomId and peerId
      ws.emit("join-room", { roomId: id, peerId: me.id });
    }
  }, [id, me, ws]);

  //Functions

  window.onresize = () => {
    console.log(window.innerHeight, window.innerWidth);

    console.log("resizing...");
    if (window.innerWidth < 768) {
      setIsMobileView(true);
    } else {
      setIsMobileView(false);
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <section className="landing">
      <main className="landing__main">
        <Heading />

        <div className="landing__container">
          <div className="flip-stream">
            <div className="flip-stream__container">
              <CSSTransition
                in={isMobileWhiteboardOn}
                timeout={300}
                classNames="flip-stream__flip"
              >
                <div className="flip-stream__card">
                  <VideoFeed
                    isVideoOn={isVideoOn}
                    username={username}
                    stream={stream}
                  />
                  <img
                    src={canvasIcon}
                    alt="Canvas Icon"
                    className="flip-stream__side flip-stream__side--back"
                  />
                  {/* <Whiteboard isDrawMode={isDrawMode} isMobile={true} /> */}
                </div>
              </CSSTransition>
            </div>
          </div>

          {/* My Video Feed */}
          {/* <VideoFeed
            isVideoOn={isVideoOn}
            username={username}
            stream={stream}
          /> */}
          {/* Peer Video Feed */}
          {Object.values(peers).map((peer) => {
            return (
              <div className="video-feed">
                <VideoFeed
                  isVideoOn={isVideoOn}
                  username="Test"
                  stream={peer.stream}
                />
              </div>
            );
          })}

          <Whiteboard isDrawMode={isDrawMode} isMobile={false} />
        </div>

        <Controls
          setIsDrawModeStamp={setIsDrawModeStamp}
          setIsMobileWhiteboardOn={setIsMobileWhiteboardOn}
          isAudioOn={isAudioOn}
          setIsAudioOn={setIsAudioOn}
          isVideoOn={isVideoOn}
          setIsVideoOn={setIsVideoOn}
          isMobileView={isMobileView}
        />

        <StartSessionForm
          username={username}
          handleUsernameChange={handleUsernameChange}
        />
      </main>
    </section>
  );
};

export default LandingPage;
