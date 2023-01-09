import { createContext, useEffect, useState, useReducer, useRef } from "react";
import { useNavigate } from "react-router";
import socketIOClient from "socket.io-client";
import Peer from "peerjs";
import { v4 as uuidV4 } from "uuid";
import { peersReducer } from "./peerReducer";
import { addPeerAction, removePeerAction } from "./peerActions";

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
  const [stream, setStream] = useState(null);
  const [peers, dispatch] = useReducer(peersReducer, {}); //useReducer
  const [inRoom, setInRoom] = useState(false);
  //Room Id
  const [roomId, setRoomId] = useState(false);

  //Enter Room
  const enterRoom = ({ roomId }) => {
    console.log(`entering room ${roomId}`);
    setInRoom(true);
    setRoomId(roomId);
    navigate(`/landing-session/${roomId}`);
  };
  //Get Users
  const getUsers = ({ participants }) => {
    console.log({ participants });
  };

  //Redirect if room is full
  const redirectHome = ({ roomId }) => {
    console.log(`${roomId} is full`);
    setInRoom(false);
    setRoomId(false);
    navigate("/error");
  };

  const removePeer = ({ peerId }) => {
    dispatch(removePeerAction(peerId));
    setRoomId(null);
  };

  const handleSendWhiteboard = () => {
    if (roomId) {
      const canvas = document.querySelector(".whiteboard__layer--me");
      const sketchedImage = canvas.toDataURL("image/png");
      ws.emit("send-whiteboard", roomId, sketchedImage);
    } else {
      console.log("nah");
    }
  };

  useEffect(() => {
    //Create peer object for user
    const myId = uuidV4();
    const peer = new Peer(myId);
    console.log(peer.id);
    setMe(peer);

    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(stream);
      } catch (error) {
        console.log(error);
      }
    };

    getMedia();
    //Websocket Listeners
    ws.on("room-created", enterRoom);
    ws.on("get-users", getUsers);
    ws.on("room-full", redirectHome);
    ws.on("user-disconnected", removePeer);
  }, []);

  useEffect(() => {
    //Check if user peer object and stream are available
    if (!me || !stream) return;

    //User joined room listener where you initiate call
    ws.on("user-joined", ({ peerId }) => {
      //Create call for every new joined user
      const call = me.call(peerId, stream); //Call user with peerId and pass our stream
      call.on("stream", (peerStream) => {
        dispatch(addPeerAction(peerId, peerStream));
      });
    });

    //Call event listener for every user that calls us
    //We answer call of another peer
    me.on("call", (call) => {
      call.answer(stream); //Answer call with our own stream
      call.on("stream", (peerStream) => {
        dispatch(addPeerAction(call.peer, peerStream));
      });
    });
  }, [me, stream]);

  return (
    <RoomContext.Provider
      value={{
        ws,
        me,
        stream,
        peers,
        inRoom,
        setInRoom,
        roomId,
        handleSendWhiteboard
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export { RoomProvider, RoomContext };
