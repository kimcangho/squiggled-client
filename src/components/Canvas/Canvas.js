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

  //Random Color
  const getRandomColor = () => {
    const hexCode = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += hexCode[Math.floor(Math.random()) * 16]
    }
    return color;
  };

  //Start Drawing
  const startDrawing = ({ nativeEvent }) => {
    if (photoCaptured) {
      const { offsetX, offsetY } = nativeEvent;
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      contextRef.current.strokeStyle = `yellow`;  //Should be random
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
      className={photoCaptured ? "canvas" : "canvas--placeholder"}
      onMouseDown={startDrawing}
      onMouseMove={drawing}
      onMouseUp={finishDrawing}
      onMouseLeave={finishDrawing}
    ></canvas>
  );
};

export default Canvas;
