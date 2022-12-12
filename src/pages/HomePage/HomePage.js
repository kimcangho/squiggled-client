//Styling
import "./HomePage.scss";
//React Hooks
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
//External Libraries
import io from "socket.io-client";
import Peer from "simple-peer";

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
  const [usersArr, setUsersArr] = useState([]);
  const [session, setSession] = useState("");

  //useRef Variables
  const myVideoRef = useRef(null);
  const socketRef = useRef(null);

  //Peer
  const peerVideoRef = useRef(null);
  const connectionRef = useRef(null);

  //Navigation variable
  const navigate = useNavigate();

  //Peer states
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [name, setName] = useState("");
  const [callerSignal, setCallerSignal] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  //Connect to server on component mount
  useEffect(() => {
    // Connect in useEffect
    socketRef.current = io.connect("http://localhost:8000");
    //Get socket id and set as user id
    socketRef.current.on("me", (data) => {
      setMyUserID(data);
      console.log(`Your user ID: ${data}`);
    });

    //Call user listener
    // socketRef.current.on("callUser", (data) => {
    //   setReceivingCall(true);
    //   setCaller(data.from); //Simple peer
    //   setName(data.name);
    //   setCallerSignal(data.signal);
    // });

    // socketRef.current.on("receive message", (data) => {
    //   console.log(data.message);
    // });
    socketRef.current.on("getActiveSessions", (data) => {
      setUsersArr(data);
    });

    socketRef.current.on("room-confirm", (data) => {
      console.log(data);
    });
    socketRef.current.on("join-confirm", (data) => {
      console.log(data);
    });
    socketRef.current.on('exit-room', (data) => {
      console.log(data)
      setActiveCall(false);
      navigate('/')
    })

    //Get Video Stream
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        setVideoStream(stream); //Set stream to our video stream
        myVideoRef.current.srcObject = stream;
      })
      .catch((err) => console.error(err));
  }, []);

  //Peer
  //Call user
  const callUser = (id) => {
    //Create a new peer
    const peer = new Peer({
      initiator: true,
      trickle: true,
      stream: videoStream, //This is our stream
    });

    //Send signaling data as object to other peer
    peer.on("signal", (data) => {
      socketRef.current.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: myUserID,
        name: name,
      });
    });
    //On peer's stream event sending their stream to us
    peer.on("stream", (stream) => {
      peerVideoRef.current.srcObject = stream; //Set peer's stream
    });

    socketRef.current.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
    //Set connection to peer so we can cancel later on during disconnect
    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: videoStream,
    });
    //Send signaling data as object to other peer
    peer.on("signal", (data) => {
      socketRef.current.emit("answerCall", {
        signal: data,
        to: caller,
      });
    });
    //On peer's stream event sending their stream to us
    peer.on("stream", (stream) => {
      peerVideoRef.current.srcObject = stream; //Set peer's stream
    });

    peer.signal(callerSignal);

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  //Socket.io

  //Functions
  //Create Session from myUserID
  const handleCreateSession = (userID) => {
    setActiveCall(true);
    setSession(userID); //Set session state
    socketRef.current.emit("create_session", userID);
    navigate(`/session/${userID}`); //Redirect to session
  };
  //Join Session
  const handleJoinSession = (sessionID, myUserID) => {
    setActiveCall(true);
    setSession(sessionID); //Set session state
    socketRef.current.emit("join_session", sessionID, myUserID);
    navigate(`/session/${sessionID}`); //Redirect to session
  };
  //End Session
  const handleEndSession = (sessionID, userID) => {
    setActiveCall(false); //Set active call to false
    socketRef.current.emit("exit_session", sessionID, userID);
    setSession(""); //Clear session state
    navigate("/"); //Redirect back to home
    //Destroy connection?
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
      <Header
        myUserID={myUserID}
        usersArr={usersArr}
        activeCall={activeCall}
        handleJoinSession={handleJoinSession}
      />

      <main className="home__main-container">
        <div className="home__core-container">
          {/* User/Broadcaster */}
          {/* if user not in active call or is host then show user's video */}
          <video
            autoPlay
            ref={myVideoRef}
            muted={!isMuted}
            className="home__feed"
          ></video>
          {/* Peer - If joining in on another user's call*/}
          {/* If call has been accepted and call has not ended */}
          {callAccepted && !callEnded && (
            <video
              autoPlay
              ref={peerVideoRef}
              muted={!isMuted}
              className="home__feed"
            ></video>
          )}

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
            handleJoinSession={handleJoinSession}
          />
        </div>
      </main>

      <Footer
        myUserID={myUserID}
        session={session}
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
