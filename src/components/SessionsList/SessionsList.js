//Styling
import "./SessionsList.scss";
//Assets
import tumbleweedImage from "../../assets/images/tumbleweed.png";
//Components
import Session from "../Session/Session";

const dummySessionData = [];
// const dummySessionData = [
//   { name: "Kent", id: "alkfjshalkffiah", description: "HALP PLZ" },
//   { name: "Ur Mom", id: "2yrqhfp984pqh", description: "..." },
//   {
//     name: "The Real Slim Shady",
//     id: "2yrqhfp984pqh",
//     description: "Need some sick rhymes",
//   },
// ];

const SessionsList = () => {
  return (
    <div className="sessions-list">
      <h2 className="sessions-list__title">Active Sessions</h2>
      <div className="sessions-list__empty-container">
        {dummySessionData.length !== 0 ? (
          dummySessionData.map((session) => {
            return (
              <Session
                key={session.id}
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
