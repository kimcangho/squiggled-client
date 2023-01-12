import "./FlipButton.scss";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";

const FlipButton = ({ frontButton, backButton, handleTrigger, isMobile }) => {
  const [showButtonFront, setShowButtonFront] = useState(true);

  const handleButtonFlip = (handleTrigger) => {
    setShowButtonFront((value) => !value);
    handleTrigger();
  };

  return (
    <article className="flipbutton">
      <div
        className={`flipbutton__container controls__button ${
          isMobile && "controls__button--mobile-only"
        }`}
      >
        <CSSTransition
          in={showButtonFront}
          timeout={300}
          classNames="flipbutton__flip"
        >
          <div
            className="flipbutton__card"
            onClick={() => handleButtonFlip(handleTrigger)}
          >
            <img
              src={backButton}
              alt="Draw Icon"
              className="flipbutton__side flipbutton__side--back controls__icon"
            />
            <img
              src={frontButton}
              alt="Stamp Icon"
              className="flipbutton__side flipbutton__side--front controls__icon"
            />
          </div>
        </CSSTransition>
      </div>
    </article>
  );
};

export default FlipButton;
