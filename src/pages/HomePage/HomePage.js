//Styling
import "./HomePage.scss";
//React Hooks
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
//External Libraries
import io from "socket.io-client";
import Peer from "simple-peer";
import { v4 as uuidv4 } from "uuid";
//Assets
import quailLogo from "../../assets/images/logo/quail.png";
import joinIcon from "../../assets/images/icons/join-in.svg";
import closeIcon from "../../assets/images/icons/close-line.svg";
import muteIcon from "../../assets/images/icons/volume-mute-line.svg";
import unmuteIcon from "../../assets/images/icons/volume-up-line.svg";
import cameraIcon from "../../assets/images/icons/camera-fill.svg";
import closeCircleIcon from "../../assets/images/icons/close-circle-line.svg";
import downloadIcon from "../../assets/images/icons/download-line.svg";
import drawIcon from "../../assets/images/icons/draw.svg";
//Components
import Canvas from "../../components/Canvas/Canvas";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import SessionsList from "../../components/SessionsList/SessionsList";

const HomePage = () => {
  //State Variables
  const [activeCall, setActiveCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [photoCaptured, setPhotoCaptured] = useState(false);

  const [videoStream, setVideoStream] = useState(false);

  //Socket.io states
  const [myUserID, setMyUserID] = useState("");
  const [usersArr, setUsersArr] = useState("");
  //Peer-to-peer states
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);

  //useRef variables
  const partnerVideo = useRef();
  const socket = useRef();

  //Navigation variable
  const navigate = useNavigate();

  //On component mount
  useEffect(() => {
    //Connect to server
    socket.current = io.connect("http://localhost:8000/");
    //Set my user id
    socket.current.on("yourID", (userId) => {
      console.log(`Your user ID: ${userId}`);
      setMyUserID(userId);
    });
    //Set array of users on call
    socket.current.on("allUsers", (users) => {
      console.log(`Users on call`);
      console.log(users);
      setUsersArr(users);
    });
    //Listen on being called from event hey
    socket.current.on("hey", (data) => {
      setReceivingCall(true); //Receiving call
      setCaller(data.from); //Set caller trying to call us
      setCallerSignal(data.signal); //Set caller's signal
    });

    const acceptCall = () => {
      setCallAccepted(true);

      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: videoStream,
      });

      peer.on("signal", (data) => {
        socket.current.emit("acceptCall", { signal: data, to: caller });
      });

      peer.on("stream", (stream) => {
        partnerVideo.current.srcObject = videoStream;
      });

      peer.signal(callerSignal);
    };
  }, []);

  //peer-to-peer
  const callPeer = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: videoStream,
    });

    //Signal to peer by emitting callUser event with object containing userId
    peer.on("signal", (data) => {
      socket.current.emit("callUser", { userToCall: id });
    });
    //Listen in on peer stream event
    peer.on("stream", (stream) => {
      //Check partnerVideo present
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
      //Call another user
      socket.current.on("callAccepted", (signal) => {
        setCallAccepted(true);
        peer.signal(signal);
      });
    });
  };

  //Functions

  //Toggle Menu - Under Construction for future active sessions display
  const toggleSessions = () => {
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
        {/* <h1 className="home__title">Qual</h1> */}
        {/* Menu */}
        {menuIsOpen ? (
          <img
            className="home__button home__button--square"
            src={closeIcon}
            alt="Close Sessions List"
            onClick={toggleSessions}
          />
        ) : (
          <img
            className="home__button home__button--square"
            src={joinIcon}
            alt="Join Sessions List"
            onClick={toggleSessions}
          />
        )}
      </header>

      {/* Video and Canvas Container */}
      <main className="home__main-container">
        <div className="home__core-container">
          {/* Live Video Stream  */}
          <VideoPlayer
            setVideoStream={setVideoStream}
            isMuted={isMuted}
            handleCaptureImage={handleCaptureImage}
          />
          {/* Canvas */}
          {photoCaptured ? (
            <Canvas handleExitCapture={handleExitCapture} />
          ) : (
            <div className="home__canvas-placeholder" />
          )}
        </div>
        <div className="home__sessions-container">
          <SessionsList users={usersArr} />
          {/* <div className="home__controls-bar">

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
          </div> */}
        </div>
      </main>

      {/* Fixed Footer */}
      <footer className="home__footer">
        <div className="home__canvas-buttons">
          <img
            className={`home__button ${
              photoCaptured
                ? "home__button--auto-selected"
                : "home__button--inactive"
            }`}
            src={drawIcon}
            alt="DrawIcon"
          />
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
        </div>

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
        {/* {photoCaptured ? ( */}
        <div className="home__canvas-buttons">
          {/* Download Button */}
          <img
            className={`home__button ${
              !photoCaptured
                && "home__button--inactive"
            }`}
            src={downloadIcon}
            alt="Download Icon"
            onClick={handleDownloadImage}
          />
          {/* Close Download Button */}
          {/* <img
              className="home__button"
              src={closeCircleIcon}
              alt="Close Circle Icon"
              onClick={handleExitCapture}
            /> */}
          <img
            className="home__button"
            src={cameraIcon}
            alt="Camera Icon"
            onClick={handleCaptureImage}
          />
        </div>
      </footer>
    </section>
  );
};

export default HomePage;
