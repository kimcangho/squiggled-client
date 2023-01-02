import "./FlipButton.scss";
//React Libraries
import { useState } from "react";
import { CSSTransition } from "react-transition-group";

const FlipButton = ({frontButton, backButton, handleToggleDrawMode}) => {

    const [showButtonFront, setShowButtonFront] = useState(true);

    const handleButtonFlip = () => {
        setShowButtonFront(value => !value);
        handleToggleDrawMode();
    }

  return (
    <article className="flipbutton">
      <div className="flipbutton__container controls__button controls__button--tablet-only">
        <CSSTransition in={showButtonFront} timeout={300} classNames="flipbutton__flip">
          <div className="flipbutton__card" onClick={handleButtonFlip}>
            <img src={backButton} alt='Draw Icon' className="flipbutton__side flipbutton__side--back controls__icon" />
            <img src={frontButton} alt='Stamp Icon' className="flipbutton__side flipbutton__side--front controls__icon" />
          </div>
        </CSSTransition>
      </div>
    </article>
  );
};

export default FlipButton;
