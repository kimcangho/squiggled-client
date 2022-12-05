// import React, { useEffect } from "react";
import "./Canvas.scss";

const Canvas = ({ canvasRef }) => {
  //Set canvas context on mount
  //   useEffect(() => {
  //     setContext(canvasRef.current.getContext("2d"));
  //     // context.fillRect(100, 100, 100, 100)    //Confirm canvas download
  //   }, [canvasRef]);

  return <canvas ref={canvasRef} className="canvas"></canvas>;
};

export default Canvas;
