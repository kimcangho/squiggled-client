import "./ErrorPage.scss";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import squidIcon from "../../assets/images/logos/squiggled-logo-blob.svg";

const ErrorPage = () => {
  const navigate = useNavigate();

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

        <motion.img
          className="error__image"
          src={squidIcon}
          alt="Squiggled Error Icon"
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
