import "./StartSessionForm.scss";
//React Hooks
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RoomContext } from "../../context/roomContext";

const StartSessionForm = ({
  myUsername,
  handleUsernameChange,
  inRoom,
  setInRoom,
  setRoomId
}) => {
  //Navigation Hook
  const navigate = useNavigate();

  //Peer-to-peer rooms
  const { ws, roomId } = useContext(RoomContext);

  const createRoom = (name) => {
    console.log("my name again is " + name);
    ws.emit("create-room", name); //Sends name to server by emitting create-room event
  };

  const handleStartSession = (name) => {
    createRoom(name);
    console.log("my name is " + name);
  };

  //To-do: End session function with button
  const handleEndSession = () => {
    setInRoom(false);
    setRoomId(null);
    navigate("/setup");
    console.log('Emptying room ' + roomId);
    ws.emit("empty-room", roomId);
  };

  return (
    <>
      {!inRoom ? (
        <form className="startSessionForm">
          <input
            type="text"
            placeholder="Type your name"
            value={myUsername}
            onChange={handleUsernameChange}
            className="startSessionForm__input"
          ></input>
          {/* Create Session Button */}
          <div
            className="startSessionForm__join"
            type="submit"
            onClick={() => handleStartSession(myUsername)}
          >
            <p className="startSessionForm__button-text">New Session</p>
          </div>
        </form>
      ) : (
        <div
          className="startSessionForm__join startSessionForm__join--end"
          type="submit"
          onClick={handleEndSession}
        >
          <p className="startSessionForm__button-text">End Session</p>
        </div>
      )}
    </>
  );
};

export default StartSessionForm;
