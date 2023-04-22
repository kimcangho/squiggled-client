import "./FlipCard.scss";

import { useState } from "react";
import { CSSTransition } from "react-transition-group";

import VideoFeed from "../VideoFeed/VideoFeed";
import Whiteboard from "../Whiteboard/Whiteboard";

const FlipCard = ({username}) => {
  const [showFront, setShowFront] = useState(true);

  const handleToggleFlip = () => {
    setShowFront((value) => !value);
  };

  return (
    <article className="flipcard">
      <div className="flipcard__container">
        <CSSTransition in={showFront} timeout={300} classNames="flipcard__flip">
          <div className="flipcard__card" onClick={handleToggleFlip}>
            <div className="flipcard__side flipcard__side--back">
              <Whiteboard />
            </div>
            <div className="flipcard__side flipcard__side--front">
              <VideoFeed username={username} />
            </div>
          </div>
        </CSSTransition>
      </div>
    </article>
  );
};

export default FlipCard;
