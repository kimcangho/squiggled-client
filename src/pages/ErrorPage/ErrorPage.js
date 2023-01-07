//Styling
import "./ErrorPage.scss";
//React Hooks
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//Assets
import squidIcon from "../../assets/images/logos/squiggled-logo-blob.svg";

const ErrorPage = () => {
  const navigate = useNavigate();

  //Redirect to error URL
  useEffect(() => {
    navigate("/error");
  }, [navigate]);

  const handleRedirect = () => {
    
    document.querySelector(".error").classList.add("error--exit");
    setTimeout(() => {
      navigate("/");
    }, 750);
  };

  return (
    <main className="error">
      <div className="error__container">
        <h1 className="error__title">Oopsies!</h1>
        <p className="error__text">Got caught in the 404 error undertow!</p>
        <img
          className="error__image"
          src={squidIcon}
          alt="Squiggled Error Icon"
        />
        <p className="error__text">Let's get ya back on home now, bud!</p>
        <button className="error__button">
          <h2
            className="error__button-text"
            type="submit"
            onClick={handleRedirect}
          >
            TAKE ME HOME
          </h2>
        </button>
      </div>
    </main>
  );
};

export default ErrorPage;
