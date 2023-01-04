import "./VideoFeed.scss";
import { useRef, useEffect } from "react";
//Assets
import userIcon from "../../assets/images/icons/user.svg";

const VideoFeed = ({ isVideoOn, username, stream }) => {
  let viewWidth = "100%";

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  });

  return (
    <div className="video-feed">
      {isVideoOn ? (
        <div className="video-feed__video-container">
          <video
            className="video-feed__webcam"
            ref={videoRef}
            autoPlay
            muted={true}
            playsInline
          />
          <p className="video-feed__overlay">
            {username ? username : "Type your name below!"}
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
            {username ? username : "Type your name below!"}
          </p>
        </>
      )}
    </div>
  );
};

export default VideoFeed;
