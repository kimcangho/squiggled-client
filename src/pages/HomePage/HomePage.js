//Styling
import "./HomePage.scss";
//Components
import Header from "../../components/Header/Header";
import Canvas from "../../components/Canvas/Canvas";
import SessionsList from "../../components/SessionsList/SessionsList";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import Footer from "../../components/Footer/Footer";

const HomePage = () => {
  return (
    <section className="home">
      <Header />
      <main className="home__main-container">
        <div className="home__core-container">
          <VideoPlayer />
          <Canvas />
        </div>
        <div className="home__sessions-container">
          <SessionsList />
        </div>
      </main>
      <Footer />
    </section>
  );
};

export default HomePage;
