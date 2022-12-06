import React, { useEffect, useState, useRef } from "react";
import "./Canvas.scss";
// import { useEffect } from "react";

const Canvas = () => {

  const [isDrawing, setIsDrawing] = useState(false);
  let canvasRef = useRef(null);
  let contextRef = useRef(null);
  

  // if (canvasRef.current) {
  //   contextRef = canvasRef.current.getContext("2d");
  // }

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    contextRef.current = context;
  

    
  }, [])
  

  // if (contextRef) {
  //   contextRef.clearRect(
  //     0,
  //     0,
  //     contextRef.canvas.current.width, //canvas.width
  //     contextRef.canvas.current.height //canvas.height
  //   );
  // }

  const startDrawing = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true);
  }

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  }

  const drawing = ({nativeEvent}) => {
    if(!isDrawing) return;
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke();
  } 

  //Clear
  const clear = () => {
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };

  //Key interactions
  const handleKeyDown = (event) => {
    //Clear Canva 
    if (event.key === "Backspace") {
      clear();
    }
    //Fill Canvas
    if (event.key === " ") {
      contextRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  window.onkeydown = handleKeyDown; 

  return (
    <canvas
      ref={canvasRef}
      className="canvas"

      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={drawing}

    ></canvas>
  );
};

export default Canvas;
