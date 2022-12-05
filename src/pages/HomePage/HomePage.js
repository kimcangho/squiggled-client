import React, { useState, useRef } from "react";
import "./HomePage.scss";

import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

//Assets
import quailLogo from "../../assets/images/logo/quail.png";
import burgerMenuIcon from "../../assets/images/icons/menu-line.svg";
import closeIcon from "../../assets/images/icons/close-line.svg";
import muteIcon from "../../assets/images/icons/volume-mute-line.svg";
import unmuteIcon from "../../assets/images/icons/volume-up-line.svg";
import cameraIcon from "../../assets/images/icons/camera-fill.svg";
import closeCircleIcon from "../../assets/images/icons/close-circle-line.svg";
import downloadIcon from "../../assets/images/icons/download-line.svg";
//Components
import Canvas from "../../components/Canvas/Canvas";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";

const HomePage = () => {
  //useRef variables
  const canvasRef = useRef(null);

  //State Variables
  const [activeCall, setActiveCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [photoCaptured, setPhotoCaptured] = useState(false);

  const navigate = useNavigate();

  //Toggle Menu
  const toggleMenu = () => {
    setMenuIsOpen((menuIsOpen) => !menuIsOpen);
  };
  //Handle Session
  const handleCreateSession = () => {
    const sessionId = uuidv4();
    setActiveCall(true);
    navigate(`/session/${sessionId}`);
  };
  const handleEndSession = () => {
    setActiveCall(false);
    navigate("/");
  };
  //Toggle Sound
  const toggleMute = () => {
    setIsMuted((isMuted) => !isMuted);
  };
  //Capture Image
  const handleCaptureImage = () => {
    console.log("Capture photo placeholder");
    setPhotoCaptured((photoCaptured) => !photoCaptured);
  };

  //Download Image from Canvas
  const handleDownloadImage = async (event) => {
    //Prevent redirect
    event.preventDefault();
    //DOM Manipulation
    const image = canvasRef.current.toDataURL("image/png"); //Convert canvas to URL
    const blob = await (await fetch(image)).blob(); //Fetch canvas image from URL and convert to blob
    const blobURL = URL.createObjectURL(blob); //Create URL for Binary Large Object image
    const link = document.createElement("a"); //Create unmounted anchor tag
    link.href = blobURL; //Set href of unmounted anchor tag
    link.download = "image.png"; //Define image download format
    link.click(); //Trigger link with programmatic click
  };

  return (
    <section className="home">
      {/* Navigation */}
      <header className="home__header">
        <Link to="/">
          <img className="home__button" src={quailLogo} alt="Qual Quail Logo" />
        </Link>
        <h1 className="home__title">Qual</h1>
        {menuIsOpen ? (
          <img
            className="home__button home__button--square"
            src={closeIcon}
            alt="Hamburger Menu"
            onClick={toggleMenu}
          />
        ) : (
          <img
            className="home__button home__button--square"
            src={burgerMenuIcon}
            alt="Hamburger Menu"
            onClick={toggleMenu}
          />
        )}
      </header>

      <VideoPlayer />
      {photoCaptured && <Canvas canvasRef={canvasRef} />}

      <footer className="home__footer">
        {/* Mute/Unmute Button */}
        {isMuted ? (
          <img
            className="home__button"
            src={unmuteIcon}
            alt="Unmute Icon"
            onClick={toggleMute}
          />
        ) : (
          <img
            className="home__button"
            src={muteIcon}
            alt="Mute Icon"
            onClick={toggleMute}
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
        {photoCaptured ? (
          <div className="home__canvas-buttons">
            <img
              className="home__button"
              src={downloadIcon}
              alt="Download Icon"
              onClick={handleDownloadImage}
            />
            <img
              className="home__button"
              src={closeCircleIcon}
              alt="Close Circle Icon"
              onClick={handleCaptureImage}
            />
          </div>
        ) : (
          <img
            className="home__button"
            src={cameraIcon}
            alt="Camera Icon"
            onClick={handleCaptureImage}
          />
        )}
      </footer>
    </section>
  );
};

export default HomePage;
