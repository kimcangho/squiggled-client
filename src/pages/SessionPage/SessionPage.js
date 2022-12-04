import React from 'react'
import './SessionPage.scss'
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer'

const SessionPage = () => {
  return (
    <section className="session">
        <VideoPlayer />
        <div className="session__end-session">
            <h2 className="home__call-text">End Call</h2>
        </div>
    </section>
  )
}

export default SessionPage