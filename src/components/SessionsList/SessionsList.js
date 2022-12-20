//Styling
import "./SessionsList.scss";
//React Hooks
import { useContext } from "react";
import { SocketContext } from "../../contexts/SocketContext";
//Assets
import phoneIcon from "../../assets/images/icons/phone.svg";
//Components
import Legend from "../Legend/Legend";
import Session from "../Session/Session";

const SessionsList = () => {
  //SocketContext
  const {
    usersArr,
    activeCall,
    handleJoinSession,
    isHost,
    myUserID,
    sessionID,
    peerID,
    receivingCall,
    acceptCall,
    callPeer,
    callAccepted,
  } = useContext(SocketContext);

  return (
    <div className={`sessions-list`}>
      {!activeCall ? (
        <>
          <h2 className="sessions-list__title">Active Sessions</h2>

          {usersArr.length === 0 ? (
            <div className="sessions-list__empty-container"></div>
          ) : (
            usersArr.map((sessionID) => {
              return (
                <Session
                  key={sessionID}
                  sessionID={sessionID}
                  handleJoinSession={handleJoinSession}
                  myUserID={myUserID}
                  callPeer={callPeer}
                  peerID={peerID}
                />
              );
            })
          )}
        </>
      ) : (
        <>
          <h2 className="sessions-list__title">
            {isHost ? "Broadcasting" : "Viewing"}
          </h2>
          {/* Incoming call notification */}
          {receivingCall && isHost && !callAccepted && (
            <div className="sessions-list__status">
              <h3>Receiving call...</h3>
              <img
                src={phoneIcon}
                alt="Phone Icon"
                className="session__phone"
                onClick={acceptCall}
              />
            </div>
          )}
          {/* Outgoing call notification */}
          {receivingCall && !isHost && !callAccepted && (
            <div className="sessions-list__status">
              <h3>You are calling {sessionID}</h3>
            </div>
          )}
        </>
      )}
      {/* In-call Legend */}
      {callAccepted && <Legend />}
    </div>
  );
};

export default SessionsList;
