//Styling
import "./SessionsList.scss";
//Assets
import tumbleweedImage from "../../assets/images/tumbleweed.png";
//Components
import Session from "../Session/Session";

const SessionsList = ({ usersArr, joinSession, activeCall }) => {
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
            usersArr.map((session, index) => {
              return (
                <Session key={index} name={session} joinSession={joinSession} />
              );
            })
          )}
        </>
      ) : (
        <>
          <h2 className="sessions-list__title">In a call</h2>
          <p>Session ID</p>
          <p>Peer ID</p>
        </>
      )}
    </div>
  );
};

export default SessionsList;
