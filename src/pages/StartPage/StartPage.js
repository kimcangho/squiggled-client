import "./StartPage.scss";

import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { RoomContext } from "../../context/roomContext";

import squidLogo from "../../assets/images/logos/squid.png";

const StartPage = () => {
  const { myUsername, setMyUsername, setRoomId } = useContext(RoomContext);

  const { id } = useParams();

  const [isJoining, setIsJoining] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [showContainer, setShowContainer] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setIsJoining(true);
      setRoomName(id);
    } else {
      navigate("/");
    }
  }, [navigate, id]);

  const handleStartSession = () => {
    setShowContainer(false);
    setTimeout(() => {
      navigate("/setup");
    }, 1000);
  };

  const handleJoinSession = async () => {
    await setRoomId(roomName);

    //Both fields invalid
    if (myUsername.length === 0 && roomName.length !== 36) {
      const fieldsArr = document.querySelectorAll(".start__input");
      fieldsArr.forEach((field) => field.classList.add("start__input--error"));
      return;
    }
    //Username empty
    if (myUsername.length === 0) {
      const fieldsArr = document.querySelectorAll(".start__input");
      fieldsArr[0].classList.add("start__input--error");
      return;
    }
    //Room name not 36 characters
    if (roomName.length !== 36) {
      const fieldsArr = document.querySelectorAll(".start__input");
      fieldsArr[1].classList.add("start__input--error");
      return;
    }

    setShowContainer(false);
    setTimeout(() => {
      navigate(`/session/${roomName}`);
    }, 1000);
  };

  const handleToggleJoin = () => {
    setIsJoining((value) => !value);
  };

  const handleUsernameChange = (event) => {
    if (event.target.value.length !== 0) {
      const fieldsArr = document.querySelectorAll(".start__input");
      fieldsArr[0].classList.remove("start__input--error");
    }
    setMyUsername(event.target.value);
  };

  const handleRoomNameChange = (event) => {
    if (event.target.value.length === 36) {
      const fieldsArr = document.querySelectorAll(".start__input");
      fieldsArr[1].classList.remove("start__input--error");
    }
    setRoomName(event.target.value);
  };

  // animation: swimUpIn 0.25s ease-in-out;

  // &--exit {
  //   animation: swimUpOut 0.25s ease-in-out forwards;
  // }

  return (
    <main className="start">
      <AnimatePresence>
        {showContainer && (
          <motion.div
            className="start__container"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.75,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.75,
              },
            }}
          >
            {!isJoining ? (
              <motion.div
                className="start__card"
                // initial={{ opacity: 0 }}
                // animate={{ opacity: 1, transition: { duration: 2 } }}
                // exit={{ opacity: 0.5, transition: { duration: 2 } }}
              >
                <motion.img
                  className="start__logo"
                  src={squidLogo}
                  alt="Squiggled Logo"
                  animate={{
                    rotateY: [0, 30, 0, 30, 0],
                    y: [0, 20, 0, -20, 0],
                    transition: {
                      repeat: Infinity,
                      duration: 20,
                      ease: "easeInOut",
                    },
                  }}
                />
                <div className="start__panel">
                  <div className="start__button" onClick={handleStartSession}>
                    <h2 className="start__text">Start</h2>
                  </div>

                  <div
                    className="start__button start__button--join"
                    onClick={handleToggleJoin}
                  >
                    <h2 className="start__text">Join</h2>
                  </div>
                </div>
              </motion.div>
            ) 
            : (
              <motion.div className="start__card">
                <form className="start__prompt">
                  <h5 className="start__text">Join right in!</h5>
                  <p className="start__body">Enter your name to join</p>
                  <input
                    type="text"
                    placeholder="Type your name"
                    value={myUsername}
                    onChange={handleUsernameChange}
                    className="start__input"
                  ></input>
                  <p className="start__body">Enter room name to join</p>
                  <input
                    type="text"
                    placeholder="Input Room Name"
                    value={roomName}
                    onChange={handleRoomNameChange}
                    className="start__input"
                  ></input>
                  <div className="start__panel">
                    <div className="start__button" onClick={handleJoinSession}>
                      <h2 className="start__text">Join Session</h2>
                    </div>
                    <div
                      className="start__button start__button--back"
                      onClick={handleToggleJoin}
                    >
                      <h2 className="start__text">Back to Home</h2>
                    </div>
                  </div>
                </form>
              </motion.div>
            )
            }
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default StartPage;
