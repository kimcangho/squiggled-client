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
  const [peerID, setPeerID] = useState("");
  const [usersArr, setUsersArr] = useState([]);
  const [session, setSession] = useState("");
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

  //Connect to server on component mount
  useEffect(() => {
    // Connect in useEffect
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
    //Set PeerID on join - Under Construction
    socketRef.current.on("join-confirm", (userData, sessionData) => {
      if (isHost) {
        setPeerID(userData);
        console.log(userData);
      } else {
        setPeerID(sessionData);
        console.log(sessionData);
      }
    });
    //Handle exit room
    socketRef.current.on("exit-room", () => {
      setActiveCall(false);
      navigate("/");
    });

    //Screenshot
    socketRef.current.on("confirm_screenshot", async (message, data) => {
      // console.log(message);
      // console.log(data);

      // document.querySelector('.home__core-container').append(image);

      //Selects current canvas
      // const oldCanvas = document.querySelector(".canvas");
      // const context = canvas.getContext("2d");
      // const video = document.querySelector("video");

      // const canvas = document.createElement("canvas"); //Creates new canvas
      // canvas.classList.add("canvas"); //Add canvas classname
      // const context = canvas.getContext("2d"); //select context
      // context.scale(2, 2);
      // // canvas.width = 640; //videoWidth 2 times display size
      // // canvas.height = 480; //videoHeight 2 times display size
      // //add image to container
      // // const image = document.createElement("img");
      // let newImage = new Image();
      // newImage.src = await data;

      // // newImage.onLoad = () => {
      // context.drawImage(newImage, 0, 0); //draw image to canvas
      // document.querySelector(".canvas").replaceWith(canvas);
      // console.log("end");
      // console.log(canvas); //Confirmed canvas coming through on both ends
      // // };

      //Create new image
      const newImg = new Image();
      console.log("loading");
      newImg.addEventListener(
        "load",
        () => {
          console.log("loaded");
          console.log(newImg.width, newImg.height)
        
          const oldCanvas = document.querySelector(".canvas");
          // const video = document.querySelector('video')
          oldCanvas.width = 320;
          oldCanvas.height = 240;
          // console.log(oldCanvas.width, oldCanvas.height);
          const context = oldCanvas.getContext("2d");
          // const video = document.querySelector("video");
          context.drawImage(newImg, 0, 0, oldCanvas.width, oldCanvas.height); //draw image to canvas
        },
        false
      );
      newImg.src = data;
      console.log("between?");
    });

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

    //SimplePeer
    //Handle being called by a peer, notify us that we are receiving a call
    socketRef.current.on("hey", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });
  }, []);

  //Simple-peer - WebRTC Logic to call someone else
  //Initiating call to another peer with our video stream
  const callPeer = (id) => {
    //Create new peer object
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: videoStream,
    });

    //on signal event, send signal for handshake
    //peer.on('signal', arg) emits a signal event to a peer
    //That peer calls peer.signal(data) to receive your event
    peer.on("signal", (data) => {
      socketRef.current.emit("callUser", {
        userToCall: id, //send to peer's id
        signalData: data, //send peer our signaling data
        from: myUserID, //user's ID
      });
    });
    //on stream event from peer
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
    //Getting stream from our peer and setting it to peer Ref
    peer.on("stream", (stream) => {
      peerVideoRef.current.srcObject = stream;
    });
    //
    peer.signal(callerSignal);
  };

  //Functions
  //Create Session from myUserID
  const handleCreateSession = (userID) => {
    setActiveCall(true);
    setIsHost(true);
    setPeerID("");
    setSession(userID); //Set session state
    socketRef.current.emit("create_session", userID);
    navigate(`/session/${userID}`); //Redirect to session
  };
  //Join Session
  const handleJoinSession = (sessionID, userID) => {
    setActiveCall(true);
    setSession(sessionID); //Set session state
    setIsHost(false);
    socketRef.current.emit("join_session", sessionID, userID);
    navigate(`/session/${sessionID}`); //Redirect to session
  };
  //End Session
  const handleEndSession = (sessionID, userID) => {
    setActiveCall(false); //Set active call to false
    setCallAccepted(false);
    setReceivingCall(false);
    socketRef.current.emit("exit_session", sessionID, userID);
    setSession(""); //Clear session state
    setIsHost(false);
    setPeerID("");
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
      // if (!!session) {  //if session is running
      //   socketRef.current.emit('send_screenshot', video, session);
      // }
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
  //Clears canvas
  const handleClearCanvas = () => {
    const canvas = document.querySelector(".canvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  };
  //Take/Delete Screenshot Keydown Handler
  const handleKeyDownPhoto = (event) => {
    if (event.key === "Enter") {
      handleCaptureImage();
    }
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
        session={session}
        peerID={peerID}
        receivingCall={receivingCall}
        acceptCall={acceptCall}
        callPeer={callPeer}
        callAccepted={callAccepted}
      />

      <main className="home__main-container">
        <div className="home__core-container">
          {/* User/Broadcaster */}
          {/* if user not in active call or is host then show user's video */}
          {!callAccepted || isHost ? (
            <video
              autoPlay
              ref={myVideoRef}
              muted={!isMuted}
              className="home__feed"
            ></video>
          ) : (
            // Peer/Viewer if user in active call and is not host
            <video
              className="home__feed home__feed--peer"
              muted
              autoPlay
              ref={peerVideoRef}
            />
          )}
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
            session={session}
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
        peerID={peerID}
        socket={socketRef.current}
        handleClearCanvas={handleClearCanvas}
      />
    </section>
  );
};

export default HomePage;
