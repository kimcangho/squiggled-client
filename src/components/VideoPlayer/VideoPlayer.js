import { useEffect, useRef } from "react";

import "./VideoPlayer.scss";

const VideoPlayer = ({ isMuted, handleCaptureImage }) => {
  let videoRef = useRef(null);

  //Stream Video
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((err) => console.error(err));
  }, [videoRef]);

  //Take Screenshot Keydown Handler - Overwrites take photo
  const handleKeyDownPhoto = (event) => {
    if (event.key === " ") {
      handleCaptureImage();
    }
  };
  //DOM manipulation - Listen in on window
  window.onkeydown = handleKeyDownPhoto;

  return (
    <video ref={videoRef} muted={!isMuted} className="video__feed"></video>
  );
};

export default VideoPlayer;
