//Styling
import "./StartPage.scss";
//React Hooks
import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
//Context
import { RoomContext } from "../../context/roomContext";
//Asset
import squidLogo from "../../assets/images/logos/squid.png";

const StartPage = () => {
  //Context
  const { myUsername, setMyUsername, setRoomId } = useContext(RoomContext);

  //UseParams
  const { id } = useParams();

  //States
  const [flipped, setFlipped] = useState(false);
  const [roomName, setRoomName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setRoomName(false);
      setFlipped(true);
      setRoomName(id);
    }
  }, [id]);

  const handleStartSession = () => {
    document.querySelector(".start").classList.add("start--exit");
    setTimeout(() => {
      navigate("/setup");
    }, 500);
  };

  const handleJoinSession = async () => {

    await setRoomId(roomName);

    //Both fields invalid
    if (myUsername.length === 0 && roomName.length !== 36) {
      const fieldsArr = document.querySelectorAll(".start__input");
      fieldsArr.forEach((field) => field.classList.add("start__input--error"));
      return;
    }
    //Username empty
    if (myUsername.length === 0) {
      const fieldsArr = document.querySelectorAll(".start__input");
      fieldsArr[0].classList.add("start__input--error");
      return;
    }
    //Room name not 36 characters
    if (roomName.length !== 36) {
      const fieldsArr = document.querySelectorAll(".start__input");
      fieldsArr[1].classList.add("start__input--error");
      return;
    }

    navigate(`/session/${roomName}`);
  };

  const handleToggleJoin = () => {
    if (!flipped) navigate("/join");
    else navigate("/");
    setFlipped((value) => !value);
  };

  const handleUsernameChange = (event) => {
    if (event.target.value.length !== 0) {
      const fieldsArr = document.querySelectorAll(".start__input");
      fieldsArr[0].classList.remove("start__input--error");
    }
    setMyUsername(event.target.value);
  };

  const handleRoomNameChange = (event) => {
    if (event.target.value.length === 36) {
      const fieldsArr = document.querySelectorAll(".start__input");
      fieldsArr[1].classList.remove("start__input--error");
    }
    setRoomName(event.target.value);
  };

  return (
    <main className="start">
      <div className="start__container">
        <div className="start__card">
          {!flipped ? (
            <div className="start__side start__side--front">
              <img
                className="start__logo"
                src={squidLogo}
                alt="Squiggled Logo"
              />
              <div className="start__panel">
                <div className="start__button" onClick={handleStartSession}>
                  <h2 className="start__text">Start</h2>
                </div>

                <div
                  className="start__button start__button--join"
                  onClick={handleToggleJoin}
                >
                  <h2 className="start__text">Join</h2>
                </div>
              </div>
            </div>
          ) : (
            <div className="start__side start__side--back">
              <form className="start__prompt">
                <h5 className="start__text start__text--back">
                  Join right in!
                </h5>
                <p className="start__body">Enter your name to join</p>
                <input
                  type="text"
                  placeholder="Type your name"
                  value={myUsername}
                  onChange={handleUsernameChange}
                  className="start__input"
                ></input>
                <p className="start__body">Enter room name to join</p>
                <input
                  type="text"
                  placeholder="Input Room Name"
                  value={roomName}
                  onChange={handleRoomNameChange}
                  className="start__input"
                ></input>
                <div className="start__panel">
                  <div className="start__button" onClick={handleJoinSession}>
                    <h2 className="start__text">Join Session</h2>
                  </div>
                  <div
                    className="start__button start__button--back"
                    onClick={handleToggleJoin}
                  >
                    <h2 className="start__text">Back to Home</h2>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default StartPage;
