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

const LandingPage = () => {
  const [username, setUsername] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (

    <section className="landing">
      <main className="landing__main">
        
        <Heading />

        <div className="landing__container">
          <VideoFeed username={username} />
          <Whiteboard />
        </div>

        <Controls />
        <StartSessionForm
          username={username}
          handleUsernameChange={handleUsernameChange}
        />

        <WhiteboardModal />

      </main>
    </section>

  );
};

export default LandingPage;
