//Styling
import "./LandingPage.scss";
//React Hooks
import { useState } from "react";
//Components
import Heading from "../../components/Heading/Heading";
import VideoFeed from "../../components/VideoFeed/VideoFeed";
import Whiteboard from "../../components/Whiteboard/Whiteboard";
import WhiteboardModal from "../../components/WhiteboardModal/WhiteboardModal";
import Controls from "../../components/Controls/Controls";
import StartSessionForm from "../../components/StartSessionForm/StartSessionForm";
import FlipCard from "../../components/FlipCard/FlipCard";

const LandingPage = () => {
  const [username, setUsername] = useState("");
  const [isDrawModeStamp, setIsDrawModeStamp] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <section className="landing">
      <main className="landing__main">
        <Heading />
        {/* Container */}
        <div className="landing__container">
          {/* <FlipCard /> */}

          <VideoFeed username={username} />
          <Whiteboard isDrawModeStamp={isDrawModeStamp} />
        </div>

        <Controls setIsDrawModeStamp={setIsDrawModeStamp} />
        <StartSessionForm
          username={username}
          handleUsernameChange={handleUsernameChange}
        />
      </main>
    </section>
  );
};

export default LandingPage;
