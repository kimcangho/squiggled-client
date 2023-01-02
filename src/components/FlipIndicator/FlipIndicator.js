import "./FlipIndicator.scss";
//React Library
import { CSSTransition } from "react-transition-group";
//Assets
import drawIcon from "../../assets/images/icons/draw.svg";
import stampIcon from "../../assets/images/icons/focus.svg";

const FlipIndicator = ({ isDrawMode }) => {
  return (
    <article className="flipindicator">
      <div className="flipindicator__container whiteboard__tool-indicator">
        <CSSTransition
          in={!isDrawMode}
          timeout={300}
          classNames="flipindicator__flip"
        >
          <div className="flipindicator__card">
            <img
              src={stampIcon}
              alt="Stamp Icon"
              className="flipindicator__side flipindicator__side--back whiteboard__icon"
            />
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
