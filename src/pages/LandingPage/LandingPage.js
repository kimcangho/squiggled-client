//Styling
import "./LandingPage.scss";
//React Hooks
import { useState } from "react";
//Components
import Heading from "../../components/Heading/Heading";
import VideoFeed from "../../components/VideoFeed/VideoFeed";
import Whiteboard from "../../components/Whiteboard/Whiteboard";
import Controls from "../../components/Controls/Controls";
import StartSessionForm from "../../components/StartSessionForm/StartSessionForm";
const LandingPage = () => {
  const [username, setUsername] = useState("");
  const [isDrawMode, setIsDrawModeStamp] = useState(false);
  const [isMobileWhiteboardOn, setIsMobileWhiteboardOn] = useState(false);

  const [isMobile, setIsMobile] = useState(false)

  

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <section className="landing">
      <main className="landing__main">
        <Heading />

        <div className="landing__container">
          <VideoFeed username={username} />
          <Whiteboard isDrawMode={isDrawMode} />
        </div>

        <Controls
          setIsDrawModeStamp={setIsDrawModeStamp}
          setIsMobileWhiteboardOn={setIsMobileWhiteboardOn}
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
