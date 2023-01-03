import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import socketIOClient from "socket.io-client";
import Peer from "peerjs";
import { v4 as uuidV4 } from "uuid";

//Server URL
const WS = "http://localhost:8000/";

//Web Signaling server
const ws = socketIOClient(WS);

//Room Context
const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  //Navigation
  const navigate = useNavigate();
  //   User state
  const [me, setMe] = useState(null);

  //Enter Room
  const enterRoom = ({ roomId }) => {
    console.log(`entering room ${roomId}`);
    navigate(`/landing-session/${roomId}`);
  };
  //Get Users
  const getUsers = ({ participants }) => {
    console.log({ participants });
  };

  //Redirect if room is full
  //To-do: Create error page
  const redirectHome = ({ roomId }) => {
    console.log(`${roomId} is full`);
    navigate("/error");
  };

  useEffect(() => {
    //Create peer object for user
    const myId = uuidV4();
    const peer = new Peer(myId);
    console.log(peer.id);
    setMe(peer);

    //Websocket Listeners
    ws.on("room-created", enterRoom);
    ws.on("get-users", getUsers);
    ws.on("room-full", redirectHome);
  }, []);

  return (
    <RoomContext.Provider value={{ ws, me }}>{children}</RoomContext.Provider>
  );
};

export { RoomProvider, RoomContext };
