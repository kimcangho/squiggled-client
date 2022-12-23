//Styling
import "./Canvas.scss";
//React Hooks
import React, { useEffect, useState, useContext } from "react";
//Use Context
import { SocketContext } from "../../utilities/contexts/SocketContext";
//Utility Functions
import { randomNumber } from "../../utilities/utilities";

const Canvas = () => {
  //Context Variables
  const { canvas, canvasContext, photoCaptured, marking } =
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
    }
  };

  return (
    <canvas
      ref={canvas}
      className={photoCaptured ? "canvas" : "canvas canvas--placeholder"}
      onPointerDown={startDrawing}
      onPointerUp={finishDrawing}
      onPointerMove={drawing}
      onPointerCancel={finishDrawing}
      onClick={handleStamp}
    ></canvas>
  );
};

export default Canvas;
