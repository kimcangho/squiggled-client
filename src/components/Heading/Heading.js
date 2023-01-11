import "./Heading.scss";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { RoomContext } from "../../context/roomContext";

import Tippy from "@tippyjs/react";

//Assets
import squiggledLogo from "../../assets/images/logos/squiggled-logo.svg";
import clipboardIcon from "../../assets/images/icons/clipboard.svg";

const Heading = ({ inRoom, setInRoom }) => {
  const { roomId } = useContext(RoomContext);

  const navigate = useNavigate();

  const handleRedirect = () => {
    setInRoom(false);
    document.querySelector(".setup").classList.add("setup--exit");
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  const handleCopyClipboard = async () => {
    if (!inRoom || !navigator.clipboard.writeText) return;

    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/join/${roomId}`
      );
    } catch (error) {
      console.error("Could not write to clipboard", error);
    }
  };

  return (
    <div className="heading">
      <img
        src={squiggledLogo}
        alt="Squiggled Logo"
        className="heading__logo"
        onClick={handleRedirect}
      />

      <div className="heading__prompt">
        {inRoom ? (
          <>
            <h5 className="heading__title">In session</h5>
            <p className="heading__body">Room ID: {roomId}</p>
          </>
        ) : (
          <>
            <h5 className="heading__title">Get Started</h5>
            <p className="heading__body">Setup your audio and video</p>
          </>
        )}
        {/* <p>Peer Id: {peerUsername}</p> */}
      </div>
      {/* Copy to Clipboard */}
      <div
        className={`controls__button ${
          inRoom ? "" : "controls__button--offline"
        }`}
      >
        <Tippy
          content="Link Copied!"
          className="heading__tooltip"
          trigger="click"
          placement="left"
          duration="[300,250]"
          disabled={!inRoom}
        >
          <img
            src={clipboardIcon}
            alt="Clipboard Icon"
            className="controls__icon "
            onClick={handleCopyClipboard}
          />
        </Tippy>
      </div>
    </div>
  );
};

export default Heading;
