import './VideoFeed.scss';
//Assets
import userIcon from "../../assets/images/icons/user.svg";

const VideoFeed = ({username}) => {
  return (
    <div className="video-feed">
      <div className="video-feed__user">
        <img src={userIcon} alt="User Icon" className="video-feed__user-icon" />
      </div>
      <p className="video-feed__username">
        {username ? username : "Type your name below!"}
      </p>
    </div>
  );
};

export default VideoFeed;
