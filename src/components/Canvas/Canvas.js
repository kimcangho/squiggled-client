//Styling
import "./Canvas.scss";
//React Hooks
import React, { useEffect, useState, useContext } from "react";
//Use Context
import { SocketContext } from "../../utilities/contexts/SocketContext";
//Utility Functions
import { randomNumber } from "../../utilities/utilities";
//Assets
import drawIcon from "../../assets/images/icons/draw.svg";
import stampIcon from "../../assets/images/icons/focus.svg";

const Canvas = () => {
  //Context Variables
  const { canvas, canvasContext, photoCaptured, marking, sessionID, socketConnection } =
    useContext(SocketContext);

  //State variable
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeColor, setStrokeColor] = useState("");
  //useRef variables

  //Set Canvas
  useEffect(() => {
    canvasContext.current = canvas.current.getContext("2d");

    setStrokeColor(
      `rgb(${randomNumber(255)}, ${randomNumber(255)}, ${randomNumber(255)})`
    );
  }, []);

  //Start Drawing - Mouse
  const startDrawing = ({ nativeEvent }) => {
    if (photoCaptured && marking) {
      const { offsetX, offsetY } = nativeEvent;
      canvasContext.current.beginPath();
      canvasContext.current.moveTo(offsetX, offsetY);
      canvasContext.current.strokeStyle = strokeColor;
      setIsDrawing(true);
    }
  };
  //While Drawing - Mouse
  const drawing = ({ nativeEvent }) => {
    if (!isDrawing) return;
    canvasContext.current.lineWidth = 5;
    const { offsetX, offsetY } = nativeEvent;
    canvasContext.current.lineTo(offsetX, offsetY);
    canvasContext.current.stroke();
  };
  //Finish Drawing - Mouse
  const finishDrawing = () => {
    if (!isDrawing) return;
    canvasContext.current.closePath();
    setIsDrawing(false);
    handleSendImage();
  };

  //Click to Stamp
  const handleStamp = ({ nativeEvent }) => {
    if (photoCaptured && !marking) {
      const { offsetX, offsetY } = nativeEvent;
      canvasContext.current.strokeStyle = strokeColor;
      canvasContext.current.beginPath();
      canvasContext.current.lineWidth = 5;
      canvasContext.current.arc(offsetX, offsetY, 20, 0, 2 * Math.PI);
      canvasContext.current.stroke();
      canvasContext.current.closePath();
      handleSendImage();
    }
  };

  //Send image from canvas
  const handleSendImage = () => {
    if (!!sessionID) {
      const image = canvas.current.toDataURL("image/png");
      socketConnection.current.emit("send_screenshot", image, sessionID);
    }
  };

  return (
    <div className="canvas__container">
      <canvas
        ref={canvas}
        className={photoCaptured ? "canvas" : "canvas canvas--placeholder"}
        onPointerDown={startDrawing}
        onPointerUp={finishDrawing}
        onPointerMove={drawing}
        onPointerCancel={finishDrawing}
        onClick={handleStamp}
      ></canvas>
      {marking ? (
        <img
          className={`canvas__draw-stamp ${
            photoCaptured ? "" : "canvas__draw-stamp--inactive"
          }`}
          src={drawIcon}
          alt="Draw Icon"
        />
      ) : (
        <img
          className={`canvas__draw-stamp ${
            photoCaptured ? "" : "canvas__draw-stamp--inactive"
          }`}
          src={stampIcon}
          alt="Stamp Icon"
        />
      )}
    </div>
  );
};

export default Canvas;
