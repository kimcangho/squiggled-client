//Styling
import "./HomePage.scss";
//React Hooks
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
//External Libraries
import io from "socket.io-client";
import Peer from "simple-peer";
import { v4 as uuidv4 } from "uuid";
//Components
import Header from "../../components/Header/Header";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
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

  //Connect to server on component mount
  useEffect(() => {
    //Connect to server
    socket.current = io.connect("http://localhost:8000/");
    //Set my user id
    socket.current.on("yourID", (userId) => {
      console.log(`Your user ID: ${userId}`);
      setMyUserID(userId);
    });
    //Set array of users
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

  //Call Peer
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
    if (photoCaptured) {
      setPhotoCaptured(false);
    }
  };

  return (
    <section className="home">

      <Header myUserID={myUserID} />

      <main className="home__main-container">
        <div className="home__core-container">
          <VideoPlayer
            setVideoStream={setVideoStream}
            isMuted={isMuted}
            handleCaptureImage={handleCaptureImage}
          />
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

      <Footer
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
