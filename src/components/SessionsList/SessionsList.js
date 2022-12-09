//Styling
import "./SessionsList.scss";
//Assets
import tumbleweedImage from "../../assets/images/tumbleweed.png";
//Components
import Session from "../Session/Session";

const users = [];

const SessionsList = () => {

  for (const user in users) {
    return <Session
    key={user.id}
    id={user.id}
    name={user.name}
    description={user.description}
  />
  }

  return (
    <div className="sessions-list">
      <h2 className="sessions-list__title">Active Sessions</h2>
      <div className="sessions-list__empty-container">
        {
        users.length !== 0 ? (
          Object.entries(users).map((session) => {
            return (
              <Session
                key={session.id}
                id={session.id}
                name={session.name}
                description={session.description}
              />
            );
          })
        ) : (
          <>
            <img
              className="sessions-list__empty-list"
              src={tumbleweedImage}
              alt="Tumbleweed"
            />
            <h3 className="sessions-list__empty-text">It's quiet...</h3>
          </>
        )}
      </div>
    </div>
  );
};

export default SessionsList;
