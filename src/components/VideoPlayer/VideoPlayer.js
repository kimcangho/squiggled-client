import { useEffect, useRef } from "react";

import "./VideoPlayer.scss";

const VideoPlayer = ({ setVideoStream, isMuted, handleCaptureImage }) => {
  let videoRef = useRef(null);

  //Stream Video
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        setVideoStream(stream);
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error(err));
  }, [setVideoStream]);

  //Take Screenshot Keydown Handler - Overwrites take photo
  const handleKeyDownPhoto = (event) => {
    if (event.key === " ") {
      handleCaptureImage();
    }
  };
  //DOM manipulation - Listen in on window
  window.onkeydown = handleKeyDownPhoto;

  return (
    <video
      autoPlay={true}
      ref={videoRef}
      muted={!isMuted}
      className="video__feed"
    ></video>
  );
};

export default VideoPlayer;
