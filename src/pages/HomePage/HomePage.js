//Styling
import "./HomePage.scss";
//React Hooks
import React, { useContext } from "react";
import { SocketContext } from "../../SocketContext";
//Assets
import broadcastIcon from "../../assets/images/icons/broadcast.svg";
import viewIcon from "../../assets/images/icons/eye.svg";
//Components
import Header from "../../components/Header/Header";
import Canvas from "../../components/Canvas/Canvas";
import SessionsList from "../../components/SessionsList/SessionsList";
import Footer from "../../components/Footer/Footer";

const HomePage = () => {
  //SocketContext
  const {
    activeCall,
    isMuted,
    photoCaptured,
    setPhotoCaptured,
    myUserID,
    peerID,
    usersArr,
    sessionID,
    isHost,
    callAccepted,
    receivingCall,
    socketConnection,
    myVideo,
    peerVideo,
    toggleMute,
    handleCaptureImage,
    handleExitCapture,
    handleClearCanvas,
    callPeer,
    acceptCall,
    handleCreateSession,
    handleJoinSession,
    handleEndSession,
  } = useContext(SocketContext);

  return (
    <section className="home">
      <Header />

      <main className="home__main-container">
        <div className="home__core-container">
          <div className="home__video-container">
            {!callAccepted || isHost ? (
              //Broadcaster
              <>
                <video
                  autoPlay
                  ref={myVideo}
                  muted={!isMuted}
                  className="home__feed"
                />
                {callAccepted && (
                  <img
                    className="home__broadcast-view"
                    src={broadcastIcon}
                    alt="Broadcast Icon"
                  />
                )}
              </>
            ) : (
              // Viewer
              <>
                <video className="home__feed" muted autoPlay ref={peerVideo} />
                <img
                  className="home__broadcast-view home__broadcast-view--viewer"
                  src={viewIcon}
                  alt="Broadcast Icon"
                />
              </>
            )}
          </div>

          <Canvas photoCaptured={photoCaptured} />
        </div>

        <div className="home__sessions-container">
          <SessionsList
            usersArr={usersArr}
            isInModal={false}
            activeCall={activeCall}
            handleJoinSession={handleJoinSession}
            isHost={isHost}
            myUserID={myUserID}
            sessionID={sessionID}
            peerID={peerID}
            receivingCall={receivingCall}
            acceptCall={acceptCall}
            callPeer={callPeer}
            callAccepted={callAccepted}
          />
        </div>
      </main>

      <Footer
        myUserID={myUserID}
        sessionID={sessionID}
        photoCaptured={photoCaptured}
        toggleMute={toggleMute}
        isMuted={isMuted}
        handleCreateSession={handleCreateSession}
        handleEndSession={handleEndSession}
        handleExitCapture={handleExitCapture}
        setPhotoCaptured={setPhotoCaptured}
        activeCall={activeCall}
        handleCaptureImage={handleCaptureImage}
        peerID={peerID}
        socket={socketConnection.current}
        handleClearCanvas={handleClearCanvas}
      />
    </section>
  );
};

export default HomePage;
