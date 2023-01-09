//Styling
import "./StartPage.scss";
//React Hooks
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
//Context
import { RoomContext } from "../../context/roomContext";
//Asset
import squidLogo from "../../assets/images/logos/squiggled-logo.svg";

const StartPage = () => {

  //Context
  const { myUsername, setMyUsername } = useContext(RoomContext);

  //States
  const [flipped, setFlipped] = useState(false);
  const [roomName, setRoomName] = useState("");

  const navigate = useNavigate();

  const handleStartSession = () => {
    document.querySelector(".start").classList.add("start--exit");
    setTimeout(() => {
      navigate("/setup");
    }, 750);
  };

  const handleJoinSession = () => {
    console.log(roomName);
    navigate(`/session/${roomName}`)
  }

  const handleToggleJoin = () => {
    setFlipped((value) => !value);
  };

  const handleUsernameChange = (event) => {
    setMyUsername(event.target.value);
    console.log(myUsername, event.target.value);
  };

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  return (
    <main className="start">
      <div className="start__container">
        <CSSTransition in={flipped} timeout={300} classNames="start__flip">
          <div className="start__card">
            {/* Front Side */}
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
            {/* Back Side */}
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
          </div>
        </CSSTransition>
      </div>
    </main>
  );
};

export default StartPage;
