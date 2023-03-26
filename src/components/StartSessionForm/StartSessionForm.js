//Styling
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
}) => {
  //Navigation Hook
  const navigate = useNavigate();

  //Peer-to-peer rooms
  const { ws, roomId, setRoomId } = useContext(RoomContext);

  const createRoom = (name) => {
    ws.emit("create-room", name); //Sends name to server by emitting create-room event
  };

  const handleStartSession = (name) => {
    if (name.length === 0) {
      document.querySelector('.startSessionForm__input').classList.add('startSessionForm__input--error');
      return;
    }
    createRoom(name);
  };

  //To-do: End session function with button
  const handleEndSession = () => {
    setInRoom(false);
    setRoomId(null);
    navigate("/setup");
    ws.emit("empty-room", roomId);
  };

  return (
    <>
      {!inRoom ? (
        <div className="startSessionForm">
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
        </div>
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
