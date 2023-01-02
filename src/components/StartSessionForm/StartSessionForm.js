import "./StartSessionForm.scss";
//React Hooks
import { useContext }  from "react";
import { useNavigate } from "react-router-dom";
import { RoomContext} from "../../context/roomContext";

const StartSessionForm = ({ username, handleUsernameChange }) => {
  //Navigation Hook
  const navigate = useNavigate();

  //room context
  const {ws} = useContext(RoomContext);

  const createRoom = () => {
    console.log('emitting create-room event to server')
    ws.emit('create-room');
  }

  //To-do: Add navigation path to custom session
  const handleStartSession = (event) => {
    event.preventDefault();
    createRoom();
  };

  return (
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
  );
};

export default StartSessionForm;
