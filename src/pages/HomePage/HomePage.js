import React, { useState } from "react";
import "./HomePage.scss";

import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

//Assets
import quailLogo from "../../assets/images/logo/quail.png";
import burgerMenu from "../../assets/images/icons/menu-line.svg";
//Components
import Canvas from "../../components/Canvas/Canvas";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";

const HomePage = () => {
  const [activeCall, setActiveCall] = useState(false);

  const navigate = useNavigate();

  const handleCreateSession = () => {
    const sessionId = uuidv4();
    console.log(sessionId);
    setActiveCall(true);
    navigate(`/session/${sessionId}`);
  };

  const handleEndSession = () => {
    setActiveCall(false);
    navigate('/');
  }

  return (
    <section className="home">
      {/* Navigation */}
      <header className="home__header">
        <Link to="/">
          <img className="home__logo" src={quailLogo} alt="Qual Quail Logo" />
        </Link>
        <h1 className="home__title">Qual</h1>
        <img className="home__menu" src={burgerMenu} alt="Hamburger Menu" />
      </header>

      <VideoPlayer />
      <Canvas />

      {/* Create new room */}
      {activeCall ? (
        <div className="home__session home__session--end" onClick={handleEndSession}>
          <h2 className="home__call-text">End Call</h2>
        </div>
      ) : (
        <div className="home__session home__session--create" onClick={handleCreateSession}>
          <h2 className="home__call-text">New Call</h2>
        </div>
      )}
    </section>
  );
};

export default HomePage;
