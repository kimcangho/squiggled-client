import { createContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  //State variables
  const [videoStream, setVideoStream] = useState(false); //stream

  //   //State Variables
  const [activeCall, setActiveCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [photoCaptured, setPhotoCaptured] = useState(false);

  //   //Socket.io states
  const [myUserID, setMyUserID] = useState("");
  const [peerID, setPeerID] = useState("");
  const [usersArr, setUsersArr] = useState([]);
  const [sessionID, setSessionID] = useState("");
  const [isHost, setIsHost] = useState(false);

  //   //Peer states
  const [callAccepted, setCallAccepted] = useState(false);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState("");

  //Ref variables
  const myVideo = useRef();
  const peerVideo = useRef();
  const socketConnection = useRef();
  const canvas = useRef();
  const canvasContext = useRef();

  //Navigation variable
  const navigate = useNavigate();

  //useEffect
  useEffect(() => {
    //Connect to server
    socketConnection.current = io.connect("http://localhost:8000");
    //Get socket id and set as user id
    socketConnection.current.on("me", (data) => {
      setMyUserID(data);
      console.log(`Your user ID: ${data}`);
    });
    //Get list of active sessions on start
    socketConnection.current.on("getActiveSessions", (data) => {
      setUsersArr(data);
      setCallAccepted(false);
      setReceivingCall(false);
    });
    //Set PeerID on join
    socketConnection.current.on("join-confirm", (userData, sessionData) => {
      if (isHost) {
        setPeerID(userData);
        console.log(`Peer userdata: ${userData}`);
      } else {
        setPeerID(sessionData);
        console.log(`Peer userdata: ${sessionData}`);
      }
    });
    //Handle exit room
    socketConnection.current.on("exit-room", () => {
      setSessionID("");
      setActiveCall(false);
      navigate("/");
    });

    //Take Screenshot
    socketConnection.current.on("confirm_screenshot", (data) => {
      const newImg = new Image();
      setPhotoCaptured(true);
      newImg.addEventListener(
        "load",
        () => {
          canvas.current.width = 320;
          canvas.current.height = 240;
          canvasContext.current.drawImage(
            newImg,
            0,
            0,
            canvas.current.width,
            canvas.current.height
          ); //draw image to canvas
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
        myVideo.current.srcObject = stream;
      })
      .catch((err) => console.error(err));

    //Simple-peer for WebRTC

    //Handle being called by a peer, notify us that we are receiving a call
    socketConnection.current.on("sendCall", (data) => {
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
      socketConnection.current.emit("callUser", {
        userToCall: id, //send to peer's id
        signalData: data, //send peer our signaling data
        from: user, //user's ID
      });
    });
    //Peer stream event listener
    peer.on("stream", (stream) => {
      if (peerVideo.current) {
        peerVideo.current.srcObject = stream;
      }
    });
    //Receive call accepted signal from peer
    socketConnection.current.on("callAccepted", (signal) => {
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
      socketConnection.current.emit("acceptCall", {
        signal: data,
        to: caller,
      });
    });
    //Get peer stream
    peer.on("stream", (stream) => {
      peerVideo.current.srcObject = stream;
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
    socketConnection.current.emit("create_session", userID);
    navigate(`/session/${userID}`);
  };
  //Join Session
  const handleJoinSession = (sessionID, userID) => {
    setActiveCall(true);
    setSessionID(sessionID); //Set session state
    setIsHost(false);
    socketConnection.current.emit("join_session", sessionID, userID);
    navigate(`/session/${sessionID}`);
  };
  //End Session
  const handleEndSession = (sessionID, userID) => {
    setActiveCall(false);
    setCallAccepted(false);
    setReceivingCall(false);
    socketConnection.current.emit("exit_session", sessionID, userID);
    setSessionID("");
    setIsHost(false);
    setPeerID("");
    navigate("/");
  };

  //Toggle Sound
  const toggleMute = () => {
    setIsMuted((isMuted) => !isMuted);
    socketConnection.current.emit("send message", { message: "Hello" });
  };

  //Capture Image
  const handleCaptureImage = () => {
    //Arbitrary delay until component mounted
    setTimeout(() => {
      //DOM Manipulation to set canvas, context and video
      const video = document.querySelector(".video__feed");
      //Get canvas dimensions
      canvas.current.width = 640;
      canvas.current.height = 480;
      //Set screenshot in canvas
      canvasContext.current.drawImage(video, 0, 0, 640, 480);
      canvasContext.current.scale(2, 2); //Scale down by 2 as camera native resolution is 640 x 480 px
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
    // const canvas = document.querySelector(".canvas");
    // const context = canvas.getContext("2d");
    canvasContext.current.clearRect(
      0,
      0,
      canvas.current.width,
      canvas.current.height
    );
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
    <SocketContext.Provider
      value={{
        toggleMute,
        handleCaptureImage,
        handleExitCapture,
        handleClearCanvas,
        handleKeyDownPhoto,
        activeCall,
        setActiveCall,
        isMuted,
        setIsMuted,
        photoCaptured,
        setPhotoCaptured,
        myUserID,
        setMyUserID,
        peerID,
        setPeerID,
        usersArr,
        setUsersArr,
        sessionID,
        setSessionID,
        isHost,
        setIsHost,
        callAccepted,
        setCallAccepted,
        receivingCall,
        setReceivingCall,
        caller,
        setCaller,
        callerSignal,
        setCallerSignal,
        socketConnection,
        myVideo,
        peerVideo,
        videoStream,
        setVideoStream,
        canvas,
        canvasContext,
        callPeer,
        acceptCall,
        handleCreateSession,
        handleJoinSession,
        handleEndSession,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

// export default SocketContext;
export { SocketProvider, SocketContext };
