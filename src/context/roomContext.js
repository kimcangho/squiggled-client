import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import socketIOClient from "socket.io-client";

// const WS = "https://squiggled-server.herokuapp.com/";
const WS = process.env.REACT_APP_SERVER_URL;

const ws = socketIOClient(WS);

const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const navigate = useNavigate();

  const [myUsername, setMyUsername] = useState("");
  const [stream, setStream] = useState(null);
  const [inRoom, setInRoom] = useState(false);
  const [roomId, setRoomId] = useState(null);

  const enterRoom = ({ roomId }) => {
    setInRoom(true);
    setRoomId(roomId);
    navigate(`/session/${roomId}`);
  };

  const removePeer = () => {
    setInRoom(false);
    setRoomId(null);
    navigate("/setup");
  };

  const emptyRoom = () => {
    setInRoom(false);
    setRoomId(null);
    navigate("/setup");
  };

  useEffect(() => {
    ws.on("room-created", enterRoom);
    ws.on("user-disconnected", removePeer);
    ws.on("empty-room", emptyRoom);
  }, []);

  return (
    <RoomContext.Provider
      value={{
        ws,
        myUsername,
        setMyUsername,
        stream,
        setStream,
        inRoom,
        setInRoom,
        roomId,
        setRoomId,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export { RoomProvider, RoomContext };
