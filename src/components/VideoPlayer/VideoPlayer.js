//Styling
import "./VideoPlayer.scss";
//React Hooks
import React, { useContext } from "react";
import { SocketContext } from "../../contexts/SocketContext";
//Assets
import broadcastIcon from "../../assets/images/icons/broadcast.svg";
import viewIcon from "../../assets/images/icons/eye.svg";

const VideoPlayer = () => {
  //SocketContext
  const { isMuted, isHost, callAccepted, myVideo, peerVideo } =
    useContext(SocketContext);

  return (
    <div className="video">
      {!callAccepted || isHost ? (
        //Broadcaster
        <>
          <video
            autoPlay
            ref={myVideo}
            muted={!isMuted}
            className="video__feed"
          />
          {callAccepted && (
            <img
              className="video__broadcast-view"
              src={broadcastIcon}
              alt="Broadcast Icon"
            />
          )}
        </>
      ) : (
        // Viewer
        <>
          <video className="video__feed" muted autoPlay ref={peerVideo} />
          <img
            className="video__broadcast-view video__broadcast-view--viewer"
            src={viewIcon}
            alt="Broadcast Icon"
          />
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
