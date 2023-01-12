import "./FlipButton.scss";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import Tippy from "@tippyjs/react";

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
            <Tippy
              content="Toggle Freehand"
              trigger="mouseenter focus"
              touch="hold"
              className="flipbutton__tooltip"
              placement="top"
              duration="0"
              disabled={showButtonFront}
            >
              <img
                src={backButton}
                alt="Draw Icon"
                className="flipbutton__side flipbutton__side--back controls__icon"
              />
            </Tippy>
            <Tippy
              content="Toggle Stamp"
              trigger="mouseenter focus"
              touch="hold"
              className="flipbutton__tooltip"
              placement="top"
              duration="0"
              disabled={!showButtonFront}
            >
              <img
                src={frontButton}
                alt="Stamp Icon"
                className="flipbutton__side flipbutton__side--front controls__icon"
              />
            </Tippy>
          </div>
        </CSSTransition>
      </div>
    </article>
  );
};

export default FlipButton;
