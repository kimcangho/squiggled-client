//Styling
import "./SessionsList.scss";
//Assets
import tumbleweedImage from "../../assets/images/tumbleweed.png";
//Components
import Session from "../Session/Session";

const SessionsList = ({
  usersArr,
  activeCall,
  handleJoinSession,
  isHost,
  myUserID,
  session,
  peerID
}) => {
  return (
    <div className={`sessions-list`}>
      {!activeCall ? (
        <>
          <h2 className="sessions-list__title">Active Sessions</h2>

          {usersArr.length === 0 ? (
            <div className="sessions-list__empty-container">
              <img
                className="sessions-list__empty-list"
                src={tumbleweedImage}
                alt="Tumbleweed"
              />
              <h3 className="sessions-list__empty-text">It's quiet...</h3>
            </div>
          ) : (
            usersArr.map((session) => {
              return (
                <Session
                  key={session}
                  name={session}
                  handleJoinSession={handleJoinSession}
                  myUserID={myUserID}
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
          {/* <p>Hosted by {session}</p>
          <p>Attended by {isHost ? peerID : myUserID}</p> */}
          {/* <p>{peerID}</p> */}
        </>
      )}
    </div>
  );
};

export default SessionsList;
