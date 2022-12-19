//Styling
import "./Canvas.scss";
//React Hooks
import React, { useEffect, useState, useContext } from "react";
//Use Context
import { SocketContext } from "../../SocketContext";
//Utility Functions
import { randomNumber } from "../../utilities/utilities";

const Canvas = ({ photoCaptured }) => {
  //Context Variables
  const { canvas, canvasContext } = useContext(SocketContext);

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

  //Start Drawing
  const startDrawing = ({ nativeEvent }) => {
    if (photoCaptured) {
      const { offsetX, offsetY } = nativeEvent;
      canvasContext.current.beginPath();
      canvasContext.current.moveTo(offsetX, offsetY);
      canvasContext.current.strokeStyle = strokeColor;
      setIsDrawing(true);
    }
  };
  //Finish Drawing
  const finishDrawing = () => {
    canvasContext.current.closePath();
    setIsDrawing(false);
  };
  //While Drawing
  const drawing = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    canvasContext.current.lineTo(offsetX, offsetY);
    canvasContext.current.stroke();
  };

  return (
    <canvas
      ref={canvas}
      className={photoCaptured ? "canvas" : "canvas canvas--placeholder"}
      onMouseDown={startDrawing}
      onMouseMove={drawing}
      onMouseUp={finishDrawing}
      onMouseLeave={finishDrawing}
    ></canvas>
  );
};

export default Canvas;
