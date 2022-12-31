import "./StartSessionForm.scss";

import { useState } from "react";

const StartSessionForm = ({username, handleUsernameChange}) => {

  return (
    <article className="startSessionForm">
      <input
        type="text"
        placeholder="Type your name"
        value={username}
        onChange={handleUsernameChange}
        className="startSessionForm__input"
      ></input>
      <div className="startSessionForm__join">
        <p className="startSessionForm__button-text">New Session</p>
      </div>
    </article>
  );
};

export default StartSessionForm;
