import "./FlipIndicator.scss";

import { useState } from "react";
import { CSSTransition } from "react-transition-group";

const FlipIndicator = ({ backIndicator, frontIndicator, isDrawModeStamp }) => {
  // const [showButtonFront, setShowButtonFront] = useState(true);

  return (
    <article className="flipindicator">
      <div className="flipindicator__container whiteboard__tool-indicator">
        <CSSTransition
          in={isDrawModeStamp}
          timeout={300}
          classNames="flipindicator__flip"
        >
          <div className="flipindicator__card">
            <img
              src={backIndicator}
              alt="Draw Icon"
              className="flipindicator__side flipindicator__side--back whiteboard__icon"
            />
            <img
              src={frontIndicator}
              alt="Stamp Icon"
              className="flipindicator__side flipindicator__side--front whiteboard__icon"
            />
          </div>
        </CSSTransition>
      </div>
    </article>
  );
};

export default FlipIndicator;
