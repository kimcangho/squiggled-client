import React from "react";
import "./HomePage.scss";

//Assets
import quailLogo from "../../assets/images/logo/quail.png";
import burgerMenu from "../../assets/images/icons/menu-line.svg";

const HomePage = () => {
  return (
    <section className="home">
      <header className="home__header">
        <img className="home__logo" src={quailLogo} alt="Qual Quail Logo" />
        <h1 className="home__title">Active Sessions</h1>
        <img className="home__menu" src={burgerMenu} alt="Hamburger Menu" />
      </header>

      <div className="home__create-session">
        <h2 className="home__call-text">New Call</h2>
      </div>

      {/* <footer>
        <a href="https://www.flaticon.com/free-icons/quail" title="quail icons">
          Quail icons created by Freepik - Flaticon
        </a>
      </footer> */}
    </section>
  );
};

export default HomePage;
