//Styling
import "./HomePage.scss";
//React Hooks
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//External Libraries
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
  //State Variables
  const [activeCall, setActiveCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [photoCaptured, setPhotoCaptured] = useState(false);

  //Navigation variable
  const navigate = useNavigate();

  //Functions

  //Toggle Menu - Under Construction for future active sessions display
  const toggleMenu = () => {
    setMenuIsOpen((menuIsOpen) => !menuIsOpen);
  };

  //Create Session
  const handleCreateSession = () => {
    const sessionId = uuidv4();
    setActiveCall(true);
    navigate(`/session/${sessionId}`);
  };
  //End Session
  const handleEndSession = () => {
    setActiveCall(false);
    navigate("/");
  };

  //Toggle Sound
  const toggleMute = () => {
    setIsMuted((isMuted) => !isMuted);
  };

  //Capture Image - Asynchronous function under construction
  //ISSUE: execute function AFTER <Canvas /> component is mounted
  //TEMP FIX: Use setTimeout function for arbitrary delay
  const handleCaptureImage = () => {
    //Arbitrary delay until component mounted
    setTimeout(() => {
      //DOM Manipulation to set canvas, context and video
      const canvas = document.querySelector(".canvas");
      const context = canvas.getContext("2d");
      const video = document.querySelector(".video__feed");
      //Get canvas dimensions
      canvas.width = video.videoWidth; //videoWidth 2 times display size
      canvas.height = video.videoHeight; //videoHeight 2 times display size
      //Set screenshot in canvas
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      context.scale(2, 2);
    }, 0);

    //Toggle photo edit mode
    setPhotoCaptured(true);
  };
  //Exit photo edit mode
  const handleExitCapture = () => {
    setPhotoCaptured(false);
  };

  //Download Image from Canvas
  const handleDownloadImage = async (event) => {
    event.preventDefault(); //Prevent redirect
    const canvas = document.querySelector(".canvas"); //DOM manipulation
    const image = canvas.toDataURL("image/png"); //Convert canvas element to URL
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
        {/* Logo */}
        <img className="home__button" src={quailLogo} alt="Qual Quail Logo" />

        {/* Title */}
        <h1 className="home__title">Qual</h1>

        {/* Menu */}
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

      {/* Video and Canvas Container */}
      <main className="home__core-container">
        {/* Live Video Stream  */}
        <VideoPlayer
          isMuted={isMuted}
          handleCaptureImage={handleCaptureImage}
        />
        {/* Canvas */}
        {photoCaptured ? (
          <Canvas handleExitCapture={handleExitCapture} />
        ) : (
          <div className="home__canvas-placeholder" />
        )}
      </main>

      {/* Fixed Footer */}
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
            {/* Download Button */}
            <img
              className="home__button"
              src={downloadIcon}
              alt="Download Icon"
              onClick={handleDownloadImage}
            />
            {/* Close Download Button */}
            <img
              className="home__button"
              src={closeCircleIcon}
              alt="Close Circle Icon"
              onClick={handleExitCapture}
            />
          </div>
        ) : (
          // Capture Image Button
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
