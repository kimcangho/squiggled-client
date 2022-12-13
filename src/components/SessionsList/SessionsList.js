//Styling
import "./SessionsList.scss";
//Assets
import phoneIcon from "../../assets/images/icons/phone.svg";
import drawIcon from "../../assets/images/icons/draw.svg";
import eraserIcon from "../../assets/images/icons/eraser.svg";
import muteIcon from "../../assets/images/icons/volume-mute-line.svg";
import unmuteIcon from "../../assets/images/icons/volume-up-line.svg";
import sendIcon from "../../assets/images/icons/send-plane.svg";
import downloadIcon from "../../assets/images/icons/download-line.svg";
import cameraIcon from "../../assets/images/icons/camera-fill.svg";
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
            <div className="sessions-list__empty-container"></div>
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
      {callAccepted && (
        // Legend
        <div className="sessions-list__tip-container">
          <h2 className="sessions-list__tip-title">Legend</h2>

          <div className="sessions-list__tip-box">
            <img
              src={cameraIcon}
              alt="Camera Icon"
              className="sessions-list__icon"
            />
            <p>Take screenshot</p>
          </div>

          <div className="sessions-list__tip-box">
            <img
              src={sendIcon}
              alt="Send Icon"
              className="sessions-list__icon"
            />
            <p>Send screenshot</p>
          </div>

          <div className="sessions-list__tip-box">
            <img
              src={downloadIcon}
              alt="Download Icon"
              className="sessions-list__icon"
            />
            <p>Download screenshot</p>
          </div>

          <div className="sessions-list__tip-box">
            <img
              src={drawIcon}
              alt="Draw Icon"
              className="sessions-list__icon"
            />
            <p>Draw mode enabled</p>
          </div>

          <div className="sessions-list__tip-box">
            <img
              src={eraserIcon}
              alt="Eraser Icon"
              className="sessions-list__icon"
            />
            <p>Clear screenshot</p>
          </div>

          <div className="sessions-list__tip-box">
            <img
              src={muteIcon}
              alt="Muted Icon"
              className="sessions-list__icon"
            />
            <p>Muted</p>
          </div>

          <div className="sessions-list__tip-box">
            <img
              src={unmuteIcon}
              alt="Unmuted Icon"
              className="sessions-list__icon"
            />
            <p>Unmuted</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionsList;
