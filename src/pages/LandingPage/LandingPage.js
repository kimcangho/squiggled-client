//Styling
import "./LandingPage.scss";
//React Hooks
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
//Components
import Heading from "../../components/Heading/Heading";
import VideoFeed from "../../components/VideoFeed/VideoFeed";
import Whiteboard from "../../components/Whiteboard/Whiteboard";
import Controls from "../../components/Controls/Controls";
import StartSessionForm from "../../components/StartSessionForm/StartSessionForm";
import { RoomContext } from "../../context/roomContext";
const LandingPage = () => {
  //State Variables
  const [username, setUsername] = useState("");
  const [isDrawMode, setIsDrawModeStamp] = useState(false);
  const [isMobileWhiteboardOn, setIsMobileWhiteboardOn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);

  //Room parameters
  const { id } = useParams();
  const { ws } = useContext(RoomContext);

  useEffect(() => {
    ws.emit("join-room", { roomId: id });
  }, [id]);

  //Functions
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <section className="landing">
      <main className="landing__main">
        <Heading />

        <div className="landing__container">
          <VideoFeed isVideoOn={isVideoOn} username={username} />
          <Whiteboard isDrawMode={isDrawMode} />
        </div>

        <Controls
          setIsDrawModeStamp={setIsDrawModeStamp}
          setIsMobileWhiteboardOn={setIsMobileWhiteboardOn}
          isAudioOn={isAudioOn}
          setIsAudioOn={setIsAudioOn}
          isVideoOn={isVideoOn}
          setIsVideoOn={setIsVideoOn}
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
