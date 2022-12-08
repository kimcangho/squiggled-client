//Styling
import "./SessionsList.scss";
//Assets
import tumbleweedImage from "../../assets/images/tumbleweed.png";

const SessionsList = () => {
  return (
    <div className="sessions">
      <h2 className="sessions__title">Active Sessions</h2>
      <div className="sessions__empty-container">
        <img
          className="sessions__empty-list"
          src={tumbleweedImage}
          alt="Tumbleweed"
        />
        <h3 className="sessions__empty-text">It's quiet...</h3>
      </div>
    </div>
  );
};

export default SessionsList;
