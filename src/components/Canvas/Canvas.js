//Styling
import "./Canvas.scss";
//React Hooks
import React, { useEffect, useState, useRef } from "react";

const Canvas = ({ photoCaptured }) => {
  //State variable
  const [isDrawing, setIsDrawing] = useState(false);
  //useRef variables
  let canvasRef = useRef(null);
  let contextRef = useRef(null);

  //Set Canvas
  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    contextRef.current = context;
  }, []);

  //Random Number Generator
  const randomNumber = (number) => {
    return Math.floor(Math.random() * (number + 1));
  };
  //Start Drawing
  const startDrawing = ({ nativeEvent }) => {
    if (photoCaptured) {
      const { offsetX, offsetY } = nativeEvent;
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);

      const randomColor = `rgb(${randomNumber(255)}, ${randomNumber(
        255
      )}, ${randomNumber(255)})`;
      contextRef.current.strokeStyle = randomColor;
      setIsDrawing(true);
    }
  };
  //Finish Drawing
  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };
  //While Drawing
  const drawing = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  return (
    <canvas
      ref={canvasRef}
      className={photoCaptured ? "canvas" : "canvas canvas--placeholder"}
      onMouseDown={startDrawing}
      onMouseMove={drawing}
      onMouseUp={finishDrawing}
      onMouseLeave={finishDrawing}
    ></canvas>
  );
};

export default Canvas;
