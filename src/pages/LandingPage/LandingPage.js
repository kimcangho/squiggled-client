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

const LandingPage = () => {
  //State Variables
  const [username, setUsername] = useState("");
  const [isDrawMode, setIsDrawModeStamp] = useState(false);
  const [isWhiteboardMobile, setIsWhiteboardMobile] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);

  //test mobile view
  const [isMobileView, setIsMobileView] = useState(true);

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

  //Initial window size useeffect
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobileView(false);
      
    } else {
      setIsMobileView(true);
    }
  }, []);

  //Functions
  window.onresize = () => {
    if (window.innerWidth >= 768) {
      setIsWhiteboardMobile(false);
      setIsMobileView(true);
    } else {
      setIsMobileView(false);
    }

    const canvases = document.querySelectorAll('.whiteboard__layer')
    canvases.forEach(canvas => {
      console.log(canvas.width);
      canvas.getContext('2d').width = 300
      canvas.getContext('2d').height = 300
      canvas.getContext('2d').scale(2,2);
    })
    

  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <section className="landing">
      <main className="landing__main">
        <Heading inRoom={inRoom} setInRoom={setInRoom} />
        {/* To-do: Set My Video Feed if broadcasting */}
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
                  <Whiteboard
                    isDrawMode={isDrawMode}
                    isMobile={true}
                    isMobileView={isMobileView}
                  />
                </div>
              </CSSTransition>
            </div>
          </div>

          {/* To-do: Set Peer Video Feed if viewing */}
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
          setInRoom={setInRoom}
        />
      </main>
    </section>
  );
};

export default LandingPage;
