//Styling
import "./VideoFeed.scss";
//React Hooks
import { useRef, useEffect } from "react";
//Assets
import userIcon from "../../assets/images/icons/user.svg";

const VideoFeed = ({ isVideoOn, isAudioOn, myUsername, stream }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;  //To-do: shut this off if we want to remove light
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
            muted={!isAudioOn}
            playsInline
          />
          <p className="video-feed__overlay" >
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
