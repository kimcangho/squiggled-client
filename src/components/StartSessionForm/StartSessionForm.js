import "./StartSessionForm.scss";
//React Hooks
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RoomContext } from "../../context/roomContext";

const StartSessionForm = ({
  username,
  handleUsernameChange,
  inRoom,
  setInRoom,
}) => {
  //Navigation Hook
  const navigate = useNavigate();

  //Peer-to-peer rooms
  const { ws } = useContext(RoomContext);
  const createRoom = () => {
    ws.emit("create-room");
  };

  const handleStartSession = (event) => {
    event.preventDefault();
    createRoom();
  };

  //To-do: End session function with button
  const handleEndSession = (event) => {
    event.preventDefault();
    setInRoom(false);
    navigate("/landing");
  };

  return (
    <>
      {!inRoom ? (
        <form className="startSessionForm">
          <input
            type="text"
            placeholder="Type your name"
            value={username}
            onChange={handleUsernameChange}
            className="startSessionForm__input"
          ></input>
          {/* Create Session Button */}
          <button
            className="startSessionForm__join"
            type="submit"
            onClick={handleStartSession}
          >
            <p className="startSessionForm__button-text">New Session</p>
          </button>
        </form>
      ) : (
        <button
          className="startSessionForm__join startSessionForm__join--end"
          type="submit"
          onClick={handleEndSession}
        >
          <p className="startSessionForm__button-text">End Session</p>
        </button>
      )}
    </>
  );
};

export default StartSessionForm;
