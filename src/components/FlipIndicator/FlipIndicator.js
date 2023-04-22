import "./FlipIndicator.scss";

import { CSSTransition } from "react-transition-group";

import drawIcon from "../../assets/images/icons/draw.svg";
import stampIcon from "../../assets/images/icons/focus.svg";

const FlipIndicator = ({ isDrawMode }) => {
  return (
    <article className="flipindicator">
      {/* Container with perspective */}
      <div className="flipindicator__container whiteboard__tool-indicator">
        {/* React Transition Group */}
        <CSSTransition
          in={!isDrawMode}
          timeout={300}
          classNames="flipindicator__flip"
        >
          {/* Card Container with Transition */}
          <div className="flipindicator__card">
            {/* Back side flipped 180 at start with back visibility hidden */}
            <img
              src={stampIcon}
              alt="Stamp Icon"
              className="flipindicator__side flipindicator__side--back whiteboard__icon"
            />
            {/* Front side with back visibility hidden */}
            <img
              src={drawIcon}
              alt="Draw Icon"
              className="flipindicator__side flipindicator__side--front whiteboard__icon"
            />
          </div>
        </CSSTransition>
      </div>
    </article>
  );
};

export default FlipIndicator;
