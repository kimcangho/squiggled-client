//Styling
import "./HomePage.scss";
//React Hooks
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
//External Libraries
import io from "socket.io-client";
import Peer from "simple-peer";
import { v4 as uuidv4 } from "uuid";

//Components
import Header from "../../components/Header/Header";
import Canvas from "../../components/Canvas/Canvas";
import SessionsList from "../../components/SessionsList/SessionsList";
import Footer from "../../components/Footer/Footer";



const HomePage = () => {
  //State Variables
  const [activeCall, setActiveCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [photoCaptured, setPhotoCaptured] = useState(false);
  const [isHost, setIsHost] = useState(false); //Session broadcaster/host

  //Video Stream State
  const [videoStream, setVideoStream] = useState(false);

  //Socket.io states
  const [myUserID, setMyUserID] = useState("");
  const [usersArr, setUsersArr] = useState([]);

  //VideoPlayer Code
  const videoRef = useRef(null);
  const socket = useRef();

  //Connect to server on component mount
  useEffect(() => {
    

    //Get Video Stream
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        setVideoStream(stream);
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error(err));
  }, []);


  // //Take Screenshot Keydown Handler - Overwrites take photo
  const handleKeyDownPhoto = (event) => {
    if (event.key === " ") {
      handleCaptureImage();
    }
  };
  // //DOM manipulation - Listen in on window
  window.onkeydown = handleKeyDownPhoto;

  //Navigation variable
  const navigate = useNavigate();

  //Connect to server with socket.io

  //Functions

  //Create Session
  const handleCreateSession = () => {
    const sessionId = uuidv4();
    setActiveCall(true);
    setIsHost(true);
    navigate(`/session/${sessionId}`);
    // socket.current.emit("test", { user: myUserID, session: sessionId });
  };
  //End Session
  const handleEndSession = () => {
    setActiveCall(false);
    setIsHost(false);
    console.log(`${myUserID} has left the building`);
    console.log(socket.current);
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
    if (photoCaptured) {
      setPhotoCaptured(false);
    }
  };

  return (
    <section className="home">
      <Header myUserID={myUserID} usersArr={usersArr} />

      <main className="home__main-container">

        <div className="home__core-container">
          <video
            autoPlay
            ref={videoRef}
            muted={!isMuted}
            className="home__feed"
          ></video>

          {photoCaptured ? (
            <Canvas
              handleExitCapture={handleExitCapture}
              handleCaptureImage={handleCaptureImage}
            />
          ) : (
            <div className="home__canvas-placeholder" />
          )}
        </div>

        <div className="home__sessions-container">
          <SessionsList usersArr={usersArr} isInModal={false} />
        </div>
      </main>

      <Footer
        myUserID={myUserID}
        photoCaptured={photoCaptured}
        toggleMute={toggleMute}
        isMuted={isMuted}
        handleCreateSession={handleCreateSession}
        handleEndSession={handleEndSession}
        handleExitCapture={handleExitCapture}
        setPhotoCaptured={setPhotoCaptured}
        activeCall={activeCall}
        handleCaptureImage={handleCaptureImage}
      />
    </section>
  );
};

export default HomePage;
