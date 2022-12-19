import { createContext, useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

// const socket = io("http://localhost:8000");

const SocketProvider = ({ children }) => {
  //State variables

  //Ref variables
  const myVideo = useRef();
  const peerVideo = useRef();
  const connection = useRef();
  const canvas = useRef();
  const canvasContext = useRef();

  //useEffect

  //Functions

  //callPeer

  //answerCall

  //exitcall

  return (
    <SocketContext.Provider
      value={{
        myVideo,
        peerVideo,
        connection,
        canvas,
        canvasContext,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

// export default SocketContext;
export { SocketProvider, SocketContext };
