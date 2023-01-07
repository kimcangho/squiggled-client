import React, { useState } from "react";
import "./StartPage.scss";
import { useNavigate } from "react-router-dom";
import squidLogo from "../../assets/images/logos/squiggled-logo.svg";

const StartPage = ({ joinURL }) => {
  const [flipped, setFlipped] = useState(false);

  const navigate = useNavigate();

  const handleSetupSession = () => {
    document.querySelector(".start").classList.add("start--exit");
    setTimeout(() => {
      navigate("/landing");
    }, 750);
  };

  const handleJoinSession = () => {
    console.log("join");
    setFlipped(true);
    
  };

  return (
    <main className="start">
      <div className="start__container">
        <img className="start__logo" src={squidLogo} alt="Squiggled Logo" />

        <div className="start__panel">
          <div className="start__button" onClick={handleSetupSession}>
            <h2 className="start__text">Start</h2>
          </div>

          <div className="start__button start__button--join">
            <h2 className="start__text">Join</h2>
          </div>
        </div>
      </div>
    </main>
  );
};

export default StartPage;
