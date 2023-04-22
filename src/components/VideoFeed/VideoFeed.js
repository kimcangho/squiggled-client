import "./VideoFeed.scss";

import { useRef, useEffect } from "react";

import userIcon from "../../assets/images/icons/user.svg";

const VideoFeed = ({ isVideoOn, myUsername, stream }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  });

  return (
    <div className="video-feed flip-stream__side flip-stream__side--front">
      {isVideoOn ? (
        <div className="video-feed__video-container">
          <video
            className="video-feed__webcam"
            ref={videoRef}
            autoPlay={isVideoOn}
            muted
            playsInline
          />
          <p className="video-feed__overlay">
            {myUsername ? myUsername : "Type your name below!"}
          </p>
        </div>
      ) : (
        <>
          <div className="video-feed__user">
            <img
              src={userIcon}
              alt="User Icon"
              className="video-feed__user-icon"
            />
          </div>
          <p className="video-feed__username">
            {myUsername ? myUsername : "Type your name below!"}
          </p>
        </>
      )}
    </div>
  );
};

export default VideoFeed;
