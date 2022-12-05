import { useEffect } from "react";

import "./VideoPlayer.scss";

const VideoPlayer = ({ videoRef, isMuted }) => {
  // let vidStream = useRef(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        // vidStream.current.srcObject = stream;
        // vidStream.current.play();
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((err) => console.error(err));
  }, [videoRef]);

  return (
    <article className="video">
      <video ref={videoRef} muted={!isMuted} className="video__feed"></video>
      {/* <canvas className="video__canvas"></canvas> */}
    </article>
  );

  //Previous code - not in use
  // const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
  // useContext(SocketContext);

  // return (
  //   <article className="video">
  //     {/* Own Video */}
  //     {stream && (
  //       <div>
  //         <h5>{name || "My Name"}</h5>
  //         <video
  //           className="video__own-video"
  //           playsInline
  //           muted
  //           ref={myVideo}
  //           autoPlay
  //         />
  //       </div>
  //     )}

  //     {/* User's Video - Not required*/}
  //     {/* {callAccepted && !callEnded && (
  //       <div>
  //         <h5>{call.name || "Other Name"}</h5>
  //         <video
  //           className="video__user-video"
  //           playsInline
  //           ref={userVideo}
  //           autoPlay
  //         />
  //       </div>
  //     )} */}
  //   </article>
  // );
};

export default VideoPlayer;
