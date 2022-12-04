import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client"; //Import socket.io-client
import Peer from "simple-peer"; //Import Simple-Peer

const SocketContext = createContext(); //Instantiate context

const socket = io("http://localhost:8000"); //Instantiate socket with passed in server

//Functional component with children props
const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState(null); //Video/Audio stream state
  const [myMessage, setMyMessage] = useState("");
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");

  const myVideo = useRef(); //Use to immediately populate video iframe with stream src
  const userVideo = useRef(); //Set other user's video
  const connectionRef = useRef();

  //Get permission to use user's camera and microphone
  useEffect(() => {
    //Use built-in navigator
    navigator.mediaCapabilities
      .getUserMedia({ video: true, audio: true }) //Access A/V and returns a promise
      .then((currentStream) => {
        setStream(currentStream); //Setting stream state not enough, need refs
        //useRef always returns .current property
        myVideo.current.srcObject = currentStream; //set myVideo as object returned by getuserMedia
      })
      .catch((error) => {
        console.log(error);
      });

    //listen for specific myMsg action to get emitted id from server and set to state
    socket.on("myMsg", (id) => setMyMessage(id));

    //Socket on handler for calluser that sets destructured call data into state
    socket.on("calluser", ({ from, name: callerName, signal }) => {
      //rename name to callerName
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  //Create all video chat functions

  const answerCall = () => {
    setCallAccepted(true);
    //create peer
    //initiator - false as this peer is not the initiator
    //trickle - false disables trickle ICE (incrementally exchange newfound addresses)
    //Pass in stream state
    const peer = new Peer({ initiator: false, trickle: false, stream });

    //Peer handler on signal received
    peer.on("signal", (data) => {
      //Establish video connxn with socket
      socket.emit("answercall", { signal: data, to: call.from });
    });

    //Handle my stream to set other user's video
    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    //peer.signal(data)
    //data encapsulates webRTC offer, answer or ice candidate
    //Call signal with call.signal
    //Call coming from initial socket calluser
    peer.signal(call.signal);

    //Current connection is equal to current peer inside new constructed Peer
    connectionRef.current = peer;
  };

  const callUser = (id) => {
    //create peer
    //initiator - true as this peer initiates call
    //trickle - false disables trickle ICE (incrementally exchange newfound addresses)
    //Pass in stream state
    const peer = new Peer({ initiator: true, truckle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("calluser", {
        userToCall: id,
        signalData: data,
        from: myMessage,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callaccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    //Current connection is equal to current peer inside new constructed Peer
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    //destory specific connection route
    connectionRef.current.destroy();
    //Reload page - Original code couldn't call another user afterward unless this was added
    //May need to change to redirect back to home page
    window.location.reload();
  };

  //Return provider from context where everything passed through value object is globally accessible
  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        myMessage,
        callUser,
        leaveCall,
        answerCall,
      }}
    >
    {/* Simply have one thing inside context, where all components are inside socket wrapped into it  */}
        {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext }
