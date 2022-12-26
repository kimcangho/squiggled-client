//Styling
import "./LandingPage.scss";
//React Hooks
import { useState } from "react";
//Assets
import questionIcon from "../../assets/images/icons/question.svg";
import userIcon from "../../assets/images/icons/user.svg";
import micIcon from "../../assets/images/icons/mic.svg";
import cameraOffIcon from "../../assets/images/icons/camera-off.svg";
import screenshotIcon from "../../assets/images/icons/screenshot.svg";

const LandingPage = () => {
  const [username, setUsername] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <section className="landing">
      <main className="landing__main">
        <div className="landing__heading">
          <h5 className="landing__title">Get Started</h5>
          <p className="landing__body">Setup your audio and video</p>
        </div>

        <div className="landing__whiteboard">
          {/* Video Feed */}
          <div className="landing__video-placeholder">
            <div className="landing__user">
              <img
                src={userIcon}
                alt="User Icon"
                className="landing__user-icon"
              />
            </div>
            <p className="landing__username">
              {username ? username : "Type your name below!"}
            </p>
          </div>
          {/* Canvas */}
          <div className="landing__canvas-placeholder"></div>
        </div>

        {/* Controls */}
        <article className="landing__controls">
          <div className="landing__tracks">
            <div className="landing__button">
              <img
                src={micIcon}
                alt="Microphone Icon"
                className="landing__icon"
              />
            </div>
            <div className="landing__button landing__button--disabled">
              <img
                src={cameraOffIcon}
                alt="Video Off Icon"
                className="landing__icon"
              />
            </div>
          </div>
          <div className="landing__button">
            <img
              src={screenshotIcon}
              alt="Microphone Icon"
              className="landing__icon"
            />
          </div>
        </article>

        {/* Credentials */}
        <article className="landing__credentials">
          <input
            type="text"
            placeholder="Type your name"
            value={username}
            onChange={handleUsernameChange}
            className="landing__input"
          ></input>
          <div className="landing__join">
            <p className="landing__button-text">New Session</p>
          </div>
        </article>
      </main>
    </section>
  );
};

export default LandingPage;
