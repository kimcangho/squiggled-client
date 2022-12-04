import React, { useState } from "react";
import "./HomePage.scss";

import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

//Assets
import quailLogo from "../../assets/images/logo/quail.png";
import burgerMenuIcon from "../../assets/images/icons/menu-line.svg";
import muteIcon from "../../assets/images/icons/volume-mute-line.svg";
import unmuteIcon from "../../assets/images/icons/volume-up-line.svg";
import cameraIcon from "../../assets/images/icons/camera-fill.svg";
//Components
import Canvas from "../../components/Canvas/Canvas";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";

const HomePage = () => {
  const [activeCall, setActiveCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const navigate = useNavigate();

  const handleOpenMenu = () => {
    console.log('Open menu confirmation');
  }

  const handleCreateSession = () => {
    const sessionId = uuidv4();
    setActiveCall(true);
    navigate(`/session/${sessionId}`);
  };
  const handleEndSession = () => {
    setActiveCall(false);
    navigate("/");
  };

  const handleMute = () => {
    setIsMuted(true);
  };
  const handleUnmute = () => {
    setIsMuted(false);
  };

  const handleCaptureImage = () => {
    console.log('Capture photo placeholder');
  }

  return (
    <section className="home">
      {/* Navigation */}
      <header className="home__header">
        <Link to="/">
          <img className="home__logo" src={quailLogo} alt="Qual Quail Logo" />
        </Link>
        <h1 className="home__title">Qual</h1>
        <img className="home__menu" src={burgerMenuIcon} alt="Hamburger Menu" onClick={handleOpenMenu} />
      </header>

      <VideoPlayer />
      <Canvas />

      <footer className="home__footer">
        {/* Mute/Unmute Button */}
        {isMuted ? (
          <img
            className="home__mute"
            src={unmuteIcon}
            alt="Unmute Icon"
            onClick={handleUnmute}
          />
        ) : (
          <img
            className="home__mute"
            src={muteIcon}
            alt="Mute Icon"
            onClick={handleMute}
          />
        )}
        {/* Session Button */}
        {activeCall ? (
          <div
            className="home__session home__session--end"
            onClick={handleEndSession}
          >
            <h2 className="home__call-text">End Session</h2>
          </div>
        ) : (
          <div
            className="home__session home__session--create"
            onClick={handleCreateSession}
          >
            <h2 className="home__call-text">New Session</h2>
          </div>
        )}
        {/* Capture Image Button */}
        <img className="home__capture" src={cameraIcon} alt="Camera Icon" onClick={handleCaptureImage} />
      </footer>
    </section>
  );
};

export default HomePage;
