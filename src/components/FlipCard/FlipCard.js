import "./FlipCard.scss";
//React Libraries
import { useState } from "react";
import { CSSTransition } from "react-transition-group";

const FlipCard = () => {
  const [showFront, setShowFront] = useState(true);

  const handleToggleFlip = () => {
    setShowFront((value) => !value);
  };

  return (
    <article className="flipcard">
      <div className="flipcard__container">
        <CSSTransition in={showFront} timeout={300} classNames="flipcard__flip">
          <div className="flipcard__card" onClick={handleToggleFlip}>
            <div className="flipcard__side flipcard__side--back">Back</div>
            <div className="flipcard__side flipcard__side--front">Front</div>
          </div>
        </CSSTransition>
      </div>
    </article>
  );
};

export default FlipCard;
