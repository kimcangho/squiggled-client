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
    navigate("/landing");
  };

  return (
    <main className="error">
      <div className="error__container">
        <h1 className="error__title">Ope, sorry!</h1>
        <h2 className="error__text">Looks like we found a 404 error, eh?</h2>
        <img
          className="error__image"
          src={squidIcon}
          alt="Squiggled Error Icon"
        />
        <h2 className="error__text">Let's get ya back on home now, bud!</h2>
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
