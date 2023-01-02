import "./VideoFeed.scss";
import { useState } from "react";
//Libraries
import Webcam from "react-webcam";
//Assets
import userIcon from "../../assets/images/icons/user.svg";

const VideoFeed = ({ isVideoOn, username }) => {
  let viewWidth = "100%";

  return (
    <div className="video-feed">
      {isVideoOn ? (
        <div className="video-feed__video-container">
          <Webcam className="video-feed__webcam" width={viewWidth} />
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
