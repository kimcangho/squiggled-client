// import React, { useState, useContext, useEffect } from "react";
// import "./SessionPage.scss";

// import { Link, useNavigate } from "react-router-dom";

// import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";

// //Context
// import { SocketContext } from "../../SocketContext";

// const SessionPage = ({ children }) => {
//   //Destructure global props from context
//   const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } =
//     useContext(SocketContext);
//   const [idtoCall, setIdToCall] = useState("");

//   const navigate = useNavigate();

//   const handleLeaveCall = () => {
//     leaveCall();
//     navigate("/");
//   }

//   return (
//     <section className="session">
//       <VideoPlayer />

//       {/* <Link to="/"> */}
//         <div className="session__end-session" onClick={handleLeaveCall}>
//           <h2 className="home__call-text">End Call</h2>
//         </div>
//       {/* </Link> */}
//     </section>
//   );
// };

// export default SessionPage;
