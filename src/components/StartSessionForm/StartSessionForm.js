import "./StartSessionForm.scss";
//React Hooks
import { useNavigate } from "react-router-dom";

const StartSessionForm = ({ username, handleUsernameChange }) => {
  //Navigation Hook
  const navigate = useNavigate();

  //To-do: Add navigation path to custom session
  const handleStartSession = (event) => {
    event.preventDefault();
    navigate('/')
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
