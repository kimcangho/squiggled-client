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
  const [isWhiteboardMobile, setIsWhiteboardMobile] = useState(false);
  // const [isMobileView, setIsMobileView] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);

  //Room parameters
  const { id } = useParams();
  const { ws, me, stream, peers, inRoom, setInRoom } = useContext(RoomContext);

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
    console.log("ok");
    if (window.innerWidth >= 768) {
      setIsWhiteboardMobile(false);
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <section className="landing">
      <main className="landing__main">
        <Heading inRoom={inRoom} setInRoom={setInRoom} />
        {/* My Video Feed */}
        <div className="landing__container">
          <div className="flip-stream">
            <div className="flip-stream__container">
              <CSSTransition
                in={!isWhiteboardMobile}
                timeout={300}
                classNames="flip-stream__flip"
              >
                <div className="flip-stream__card">
                  <VideoFeed
                    isVideoOn={isVideoOn}
                    username={username}
                    stream={stream}
                  />
                  {/* <img
                    src={canvasIcon}
                    alt="Canvas Icon"
                    className="flip-stream__side flip-stream__side--back"
                    onClick={() => {
                      console.log("ets");
                    }}
                  /> */}
                  <Whiteboard isDrawMode={isDrawMode} isMobile={true} />
                </div>
              </CSSTransition>
            </div>
          </div>

          {/* Peer Video Feed */}
          {Object.values(peers).map((peer) => {
            console.log(peers.participants);
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
          isWhiteboardMobile={isWhiteboardMobile}
          setIsWhiteboardMobile={setIsWhiteboardMobile}
          isAudioOn={isAudioOn}
          setIsAudioOn={setIsAudioOn}
          isVideoOn={isVideoOn}
          setIsVideoOn={setIsVideoOn}
        />

        <StartSessionForm
          username={username}
          handleUsernameChange={handleUsernameChange}
          inRoom={inRoom}
        />
      </main>
    </section>
  );
};

export default LandingPage;
