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

  //Video Stream State
  const [videoStream, setVideoStream] = useState(false);

  //Socket.io states
  const [myUserID, setMyUserID] = useState("");
  const [usersArr, setUsersArr] = useState([]);
  const [session, setSession] = useState("");

  //useRef Variables
  const videoRef = useRef(null);
  const socketRef = useRef(null);
  //Navigation variable
  const navigate = useNavigate();

  //Connect to server on component mount
  useEffect(() => {
    // Connect in useEffect
    socketRef.current = io.connect("http://localhost:8000");

    socketRef.current.on("receive message", (data) => {
      console.log(data.message);
    });

    socketRef.current.on("getActiveSessions", (data) => {
      setUsersArr(data);
    });

    socketRef.current.on("startingActiveSessions", (data) => {
      setUsersArr(data);
    });

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

  //Socket.io
  const joinSession = (sessionID) => {
    console.log(`Joining session: ${sessionID}`);
    setActiveCall(true);
    socketRef.current.emit("join_session", sessionID);
  };
  const exitSession = (sessionID) => {
    console.log(`Leaving session: ${sessionID}`);
    setActiveCall(false);
    socketRef.current.emit("exit_session", sessionID);
  };

  //Functions
  //Create Session
  const handleCreateSession = () => {
    const sessionId = uuidv4();
    setActiveCall(true);
    setSession(sessionId);
    joinSession(sessionId);
    navigate(`/session/${sessionId}`);
  };
  //End Session
  const handleEndSession = (session) => {
    setActiveCall(false);
    exitSession(session);
    setSession("");
    navigate("/");
  };

  //Toggle Sound
  const toggleMute = () => {
    setIsMuted((isMuted) => !isMuted);
    socketRef.current.emit("send message", { message: "Hello" });
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
      const video = document.querySelector(".home__feed");
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

  //Take/Delete Screenshot Keydown Handler
  const handleKeyDownPhoto = (event) => {
    if (event.key === "Enter") {
      handleCaptureImage();
    }
    if (event.key === "Escape") {
      if (document.querySelector(".canvas")) {
        const canvas = document.querySelector(".canvas");
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        handleExitCapture();
      }
    }
  };
  window.onkeydown = handleKeyDownPhoto;

  return (
    <section className="home">
      <Header myUserID={myUserID} usersArr={usersArr} />

      <main className="home__main-container">
        <div className="home__core-container">
          {/* User/Broadcaster */}
          <video
            autoPlay
            ref={videoRef}
            muted={!isMuted}
            className="home__feed"
          ></video>
          {/* Peer */}
          <video
            autoPlay
            // ref={videoRef}
            muted={!isMuted}
            className="home__feed"
          ></video>

          {photoCaptured ? (
            <Canvas />
          ) : (
            <div className="home__canvas-placeholder" />
          )}
        </div>

        <div className="home__sessions-container">
          <SessionsList
            usersArr={usersArr}
            isInModal={false}
            activeCall={activeCall}
            joinSession={joinSession}
          />
        </div>
      </main>

      <Footer
        session={session}
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
