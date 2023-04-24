import "./Heading.scss";

import { useContext } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { RoomContext } from "../../context/roomContext";

import Tippy from "@tippyjs/react";

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
      <Tippy
        content="Take Me Home!"
        trigger="mouseenter focus"
        placement="top"
        duration="0"
        touch="hold"
      >
        <motion.img
          src={squiggledLogo}
          alt="Squiggled Logo"
          className="heading__logo"
          animate={{
            rotateY: [0, 30, 0],
            transition: {
              repeat: Infinity,
              duration: 10,
              ease: "easeInOut",
            },
          }}
          onClick={handleRedirect}
        />
      </Tippy>

      <div className="heading__prompt">
        {inRoom ? (
          <>
            <h5 className="heading__title">In session</h5>
            <p className="heading__body">Room ID: {roomId}</p>
          </>
        ) : (
          <>
            <h5 className="heading__title">Get Started</h5>
            <p className="heading__body">Setup video and draw!</p>
          </>
        )}
      </div>
      {/* Copy to Clipboard */}
      <Tippy
        content="Copy Session Link"
        trigger="mouseenter focus"
        touch="hold"
        placement="top"
        duration="0"
        disabled={!inRoom}
      >
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
      </Tippy>
    </div>
  );
};

export default Heading;
