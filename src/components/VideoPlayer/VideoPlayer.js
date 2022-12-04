import React, { useContext } from "react";

import "./VideoPlayer.scss";

import { ContextProvider, SocketContext } from "../../SocketContext";

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);

  return (
    <article className="video">
      {/* Own Video */}
      {stream && (
        <div>
          <h5>{name || "My Name"}</h5>
          <video
            className="video__own-video"
            playsInline
            muted
            ref={myVideo}
            autoPlay
          />
        </div>
      )}

      {/* User's Video */}
      {callAccepted && !callEnded && (
        <div>
          <h5>{call.name || "Other Name"}</h5>
          <video
            className="video__user-video"
            playsInline
            ref={userVideo}
            autoPlay
          />
        </div>
      )}
    </article>
  );
};

export default VideoPlayer;
