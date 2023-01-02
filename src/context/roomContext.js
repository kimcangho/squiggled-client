import { createContext, useEffect } from "react";
import { useNavigate } from "react-router";
import socketIOClient from "socket.io-client";
const WS = "http://localhost:8000/";

const RoomContext = createContext();

const ws = socketIOClient(WS);

const RoomProvider = ({ children }) => {
  const navigate = useNavigate();

  const enterRoom = ({ roomId }) => {
    console.log(`entering room ${roomId}`);
    navigate(`/landing-session/${roomId}`);
  };

  useEffect(() => {
    ws.on("room-created", enterRoom);
  }, []);

  return <RoomContext.Provider value={{ ws }}>{children}</RoomContext.Provider>;
};

export { RoomProvider, RoomContext };
