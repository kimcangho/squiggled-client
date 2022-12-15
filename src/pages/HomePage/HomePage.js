//Styling
import "./HomePage.scss";
//React Hooks
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
//External Libraries
import io from "socket.io-client";
import Peer from "simple-peer";
//Assets
import broadcastIcon from "../../assets/images/icons/broadcast.svg";
import viewIcon from "../../assets/images/icons/eye.svg";
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
  const [videoStream, setVideoStream] = useState(false); //stream

  //Socket.io states
  const [myUserID, setMyUserID] = useState("");
  const [peerID, setPeerID] = useState("");
  const [usersArr, setUsersArr] = useState([]);
  const [sessionID, setSessionID] = useState("");
  const [isHost, setIsHost] = useState(false);

  //Peer states
  const [callAccepted, setCallAccepted] = useState(false);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState("");

  //useRef Variables
  const myVideoRef = useRef(null);
  const socketRef = useRef(null);
  const peerVideoRef = useRef(null);

  //Navigation variable
  const navigate = useNavigate();

  useEffect(() => {
    //Connect to server
    socketRef.current = io.connect("http://localhost:8000");
    console.log(socketRef.current);
    //Get socket id and set as user id
    socketRef.current.on("me", (data) => {
      setMyUserID(data);
      console.log(`Your user ID: ${data}`);
    });
    //Get list of active sessions on start
    socketRef.current.on("getActiveSessions", (data) => {
      setUsersArr(data);
      setCallAccepted(false);
      setReceivingCall(false);
    });
    //Set PeerID on join
    socketRef.current.on("join-confirm", (userData, sessionData) => {
      if (isHost) {
        setPeerID(userData);
        console.log(`Peer userdata: ${userData}`);
      } else {
        setPeerID(sessionData);
        console.log(`Peer userdata: ${sessionData}`);
      }
    });
    //Handle exit room
    socketRef.current.on("exit-room", () => {
      setSessionID("");
      setActiveCall(false);
      navigate("/");
    });

    //Take Screenshot
    socketRef.current.on("confirm_screenshot", (data) => {
      const newImg = new Image();
      setPhotoCaptured(true);
      newImg.addEventListener(
        "load",
        () => {
          const canvas = document.querySelector(".canvas");
          canvas.width = 320;
          canvas.height = 240;
          const context = canvas.getContext("2d");
          context.drawImage(newImg, 0, 0, canvas.width, canvas.height); //draw image to canvas
        },
        false
      );
      newImg.src = data;
    });

    //Get Video Stream
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        setVideoStream(stream);
        myVideoRef.current.srcObject = stream;
      })
      .catch((err) => console.error(err));

    //Simple-peer for WebRTC

    //Handle being called by a peer, notify us that we are receiving a call
    socketRef.current.on("sendCall", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });
  }, []);

  //Initiating call to peer
  const callPeer = (id, user) => {
    //Create new peer object containing our stream
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: videoStream,
    });

    //Peer signal event listener
    peer.on("signal", (data) => {
      socketRef.current.emit("callUser", {
        userToCall: id, //send to peer's id
        signalData: data, //send peer our signaling data
        from: user, //user's ID
      });
    });
    //Peer stream event listener
    peer.on("stream", (stream) => {
      if (peerVideoRef.current) {
        peerVideoRef.current.srcObject = stream;
      }
    });
    //Receive call accepted signal from peer
    socketRef.current.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
  };

  //Accept Call from Peer
  const acceptCall = () => {
    setCallAccepted(true);
    //Create peer object that will receive our data
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: videoStream,
    });
    //fire off signal to peer (caller) with our signal
    peer.on("signal", (data) => {
      socketRef.current.emit("acceptCall", {
        signal: data,
        to: caller,
      });
    });
    //Get peer stream
    peer.on("stream", (stream) => {
      peerVideoRef.current.srcObject = stream;
    });
    //
    peer.signal(callerSignal);
  };

  //Functions

  //Create Session
  const handleCreateSession = (userID) => {
    setActiveCall(true);
    setIsHost(true);
    setPeerID("");
    setSessionID(userID);
    socketRef.current.emit("create_session", userID);
    navigate(`/session/${userID}`);
  };
  //Join Session
  const handleJoinSession = (sessionID, userID) => {
    setActiveCall(true);
    setSessionID(sessionID); //Set session state
    setIsHost(false);
    socketRef.current.emit("join_session", sessionID, userID);
    navigate(`/session/${sessionID}`);
  };
  //End Session
  const handleEndSession = (sessionID, userID) => {
    setActiveCall(false);
    setCallAccepted(false);
    setReceivingCall(false);
    socketRef.current.emit("exit_session", sessionID, userID);
    setSessionID("");
    setIsHost(false);
    setPeerID("");
    navigate("/");
  };

  //Toggle Sound
  const toggleMute = () => {
    setIsMuted((isMuted) => !isMuted);
    socketRef.current.emit("send message", { message: "Hello" });
  };

  //Capture Image
  const handleCaptureImage = () => {
    //Arbitrary delay until component mounted
    setTimeout(() => {
      //DOM Manipulation to set canvas, context and video
      const canvas = document.querySelector(".canvas");
      const context = canvas.getContext("2d");
      const video = document.querySelector(".home__feed");
      //Get canvas dimensions
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      //Set screenshot in canvas
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      context.scale(2, 2);  //Scale down by 2 as camera native resolution is 640 x 480 px
    }, 0);
    setPhotoCaptured(true);
  };
  //Exit photo edit mode
  const handleExitCapture = () => {
    if (photoCaptured) {
      setPhotoCaptured(false);
    }
  };
  //Clear canvas
  const handleClearCanvas = () => {
    const canvas = document.querySelector(".canvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    setPhotoCaptured(false);
  };
  //Screenshot Keydown Handler
  const handleKeyDownPhoto = (event) => {
    //Capture Image
    if (event.key === "Enter") {
      handleCaptureImage();
    }
    //Clear canvas
    if (event.key === "Escape") {
      if (document.querySelector(".canvas")) {
        handleClearCanvas();
        handleExitCapture();
      }
    }
  };
  window.onkeydown = handleKeyDownPhoto;

  return (
    <section className="home">

      <Header
        myUserID={myUserID}
        usersArr={usersArr}
        activeCall={activeCall}
        handleJoinSession={handleJoinSession}
        isHost={isHost}
        sessionID={sessionID}
        peerID={peerID}
        receivingCall={receivingCall}
        acceptCall={acceptCall}
        callPeer={callPeer}
        callAccepted={callAccepted}
      />

      <main className="home__main-container">

        <div className="home__core-container">
          <div className="home__video-container">
            {!callAccepted || isHost ? (
              //Broadcaster
              <>
                <video
                  autoPlay
                  ref={myVideoRef}
                  muted={!isMuted}
                  className="home__feed"
                />
                {callAccepted && (
                  <img
                    className="home__broadcast-view"
                    src={broadcastIcon}
                    alt="Broadcast Icon"
                  />
                )}
              </>
            ) : (
              // Viewer
              <>
                <video
                  className="home__feed"
                  muted
                  autoPlay
                  ref={peerVideoRef}
                />
                <img
                  className="home__broadcast-view home__broadcast-view--viewer"
                  src={viewIcon}
                  alt="Broadcast Icon"
                />
              </>
            )}
          </div>

          <Canvas photoCaptured={photoCaptured} />
        
        </div>

        <div className="home__sessions-container">

          <SessionsList
            usersArr={usersArr}
            isInModal={false}
            activeCall={activeCall}
            handleJoinSession={handleJoinSession}
            isHost={isHost}
            myUserID={myUserID}
            peerID={peerID}
            receivingCall={receivingCall}
            acceptCall={acceptCall}
            callPeer={callPeer}
            callAccepted={callAccepted}
          />

        </div>
      </main>

      <Footer
        myUserID={myUserID}
        sessionID={sessionID}
        photoCaptured={photoCaptured}
        toggleMute={toggleMute}
        isMuted={isMuted}
        handleCreateSession={handleCreateSession}
        handleEndSession={handleEndSession}
        handleExitCapture={handleExitCapture}
        setPhotoCaptured={setPhotoCaptured}
        activeCall={activeCall}
        handleCaptureImage={handleCaptureImage}
        peerID={peerID}
        socket={socketRef.current}
        handleClearCanvas={handleClearCanvas}
      />

    </section>
  );
};

export default HomePage;
