// import React, { useContext } from "react";
import { useEffect, useState } from "react";

import "./VideoPlayer.scss";

// import { ContextProvider, SocketContext } from "../../SocketContext";

const VideoPlayer = () => {
  // const [playing, setPlaying] = useState(false);

  useEffect(() => {
    navigator.getUserMedia(
      {
        video: true,
        audio: true,
      },
      (stream) => {
        let video = document.querySelector(".video__feed");
        if (video) {
          video.srcObject = stream;
        }
      },
      (err) => console.error(err)
    );
  }, []);

  // const startVideo = () => {
  // 	setPlaying(true);
  // 	navigator.getUserMedia(
  // 		{
  // 			video: true,
  //       audio: true
  // 		},
  // 		(stream) => {
  // 			let video = document.querySelector('.video__feed');
  // 			if (video) {
  // 				video.srcObject = stream;
  // 			}
  // 		},
  // 		(err) => console.error(err)
  // 	);
  // };

  // const stopVideo = () => {
  // 	setPlaying(false);
  // 	let video = document.querySelector('.video__feed');
  //   console.log(video.srcObject.getTracks());
  // 	video.srcObject.getTracks()[0].stop();
  //   video.srcObject.getTracks()[1].stop();
  // };

  return (
    <article className="video">
      <video
        muted
        autoPlay
        className="video__feed"
      ></video>

      {/* <div className="app__input">
				{playing ? (
					<button onClick={stopVideo}>Stop</button>
				) : (
					<button onClick={startVideo}>Start</button>
				)}
			</div> */}
    </article>
  );

  // const [playing, setPlaying] = useState(false);

  // const height = 320;
  // const width = 320;

  // const startVideo = () => {
  //   setPlaying(true);
  //   navigator.mediaDevices.getUserMedia(
  //     { video: true, audio: true },
  //     (stream) => {
  //       let video = document.getElementById(".video__player");
  //       if (video) {
  //         video.srcObject = stream;
  //       }
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // };

  // const stopVideo = () => {
  //   setPlaying(false);
  //   let video = document.getElementById(".video__player");
  //   video.srcObject.getTracks()[0].stop();
  // };

  // // useEffect(() => {
  // //   navigator.getUserMedia({video: true, audio: true})
  // //   .then(stream => {
  // //     video.srcObject = stream;
  // //     video.play();
  // //   })
  // // }, [])

  // return (
  //   <article className="video">
  //     <video
  //       height={height}
  //       width={width}
  //       muted
  //       autoPlay
  //       className="video__player"
  //     ></video>
  //     {playing ? (
  //       <div onClick={stopVideo}>Stop</div>
  //     ) : (
  //       <div onClick={startVideo}>Start</div>
  //     )}
  //   </article>
  // );

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
