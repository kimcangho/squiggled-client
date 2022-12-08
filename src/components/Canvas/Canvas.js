//Styling
import "./Canvas.scss";
//React Hooks
import React, { useEffect, useState, useRef } from "react";

const Canvas = ({ handleExitCapture }) => {
  //State variable
  const [isDrawing, setIsDrawing] = useState(false);
  //useRef variables
  let canvasRef = useRef(null);
  let contextRef = useRef(null);

  //Set
  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    contextRef.current = context;
  }, [canvasRef]);

  //Start Drawing
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
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

  //Clear Canvas Handler
  const handleKeyDown = (event) => {
    if (event.key === "Escape" || event.key === "Backspace") {
      contextRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      handleExitCapture();
    }
  };
  //DOM manipulation - Listen in on window
  window.onkeydown = handleKeyDown;

  return (
    <canvas
      ref={canvasRef}
      className="canvas"
      onMouseDown={startDrawing}
      onMouseMove={drawing}
      onMouseUp={finishDrawing}
      onMouseLeave={finishDrawing}
    ></canvas>
  );
};

export default Canvas;
