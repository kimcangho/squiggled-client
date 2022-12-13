//Styling
import "./SessionsList.scss";
//Assets
import tumbleweedImage from "../../assets/images/tumbleweed.png";
import phoneIcon from "../../assets/images/icons/phone.svg";
//Components
import Session from "../Session/Session";

const SessionsList = ({
  usersArr,
  activeCall,
  handleJoinSession,
  isHost,
  myUserID,
  session,
  peerID,
  receivingCall,
  acceptCall,
  callPeer,
  callAccepted,
}) => {
  return (
    <div className={`sessions-list`}>
      {!activeCall ? (
        <>
          <h2 className="sessions-list__title">Active Sessions</h2>

          {usersArr.length === 0 ? (
            <div className="sessions-list__empty-container">
              {/* <img
                className="sessions-list__empty-list"
                src={tumbleweedImage}
                alt="Tumbleweed"
              /> */}
              {/* <h3 className="sessions-list__empty-text">It's quiet...</h3> */}
            </div>
          ) : (
            usersArr.map((session) => {
              return (
                <Session
                  key={session}
                  name={session}
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
            {isHost ? "Hosting" : "Visiting"}
          </h2>
          {receivingCall && isHost && !callAccepted && (
            <div className="sessions-list__status">
              <h3>{peerID} is calling you</h3>
              <img
                src={phoneIcon}
                alt="Phone Icon"
                className="session__phone"
                onClick={acceptCall}
              />
            </div>
          )}
          {receivingCall && !isHost && !callAccepted && (
            <div className="sessions-list__status">
              <h3>You are calling {session}</h3>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SessionsList;
