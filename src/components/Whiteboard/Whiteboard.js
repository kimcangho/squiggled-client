//Styling
import "./Whiteboard.scss";
//React Hooks
import { useEffect, useState, useRef } from "react";
//Components
import FlipIndicator from "../FlipIndicator/FlipIndicator";
//Utility Functions
import { randomNumber } from "../../utilities/utilities";

const Whiteboard = ({
  isDrawMode,
  isMobile,
  isMobileView,
  setIsCaptureLayerActive,
  setIsDrawLayerActive,
}) => {
  //State variable
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeColor, setStrokeColor] = useState("");
  //useRef variables
  const captureCanvasRef = useRef(null);
  const captureContextRef = useRef(null);
  const myCanvasRef = useRef(null);
  const myContextRef = useRef(null);

  //Set Canvas
  useEffect(() => {
    captureContextRef.current = captureCanvasRef.current.getContext("2d");
    myContextRef.current = myCanvasRef.current.getContext("2d");

    setStrokeColor(
      `rgb(${randomNumber(255)}, ${randomNumber(255)}, ${randomNumber(255)})`
    );
  }, []);

  //Stamping Tool
  const handleStamp = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    if (isDrawMode) {
      console.log(offsetX, offsetY);
      myContextRef.current.strokeStyle = strokeColor;
      myContextRef.current.beginPath();
      myContextRef.current.lineWidth = 5;
      myContextRef.current.arc(offsetX, offsetY, 10, 0, 2 * Math.PI);
      myContextRef.current.stroke();
      myContextRef.current.closePath();
      setIsCaptureLayerActive(true);
      setIsDrawLayerActive(true);
    }
  };

  //Drawing Tool
  //Start Drawing
  const startDrawing = ({ nativeEvent }) => {
    if (!isDrawMode) {
      const { offsetX, offsetY } = nativeEvent;
      console.log(offsetX, offsetY);
      myContextRef.current.beginPath();
      myContextRef.current.moveTo(offsetX, offsetY);
      myContextRef.current.strokeStyle = strokeColor;
      setIsDrawing(true);
    }
  };
  //While Drawing
  const drawing = ({ nativeEvent }) => {
    if (!isDrawing) return;
    myContextRef.current.lineWidth = 5;
    const { offsetX, offsetY } = nativeEvent;
    myContextRef.current.lineTo(offsetX, offsetY);
    myContextRef.current.stroke();
  };
  //Finish Drawing
  const finishDrawing = () => {
    if (!isDrawing) return;
    myContextRef.current.closePath();
    setIsDrawing(false);
    setIsCaptureLayerActive(true);
    setIsDrawLayerActive(true);
  };

  return (
    <article
      className={`whiteboard  ${
        isMobile &&
        !isMobileView &&
        "whiteboard--mobile flip-stream__side flip-stream__side--back"
      } `}
    >
      <canvas ref={captureCanvasRef} className="whiteboard__layer"></canvas>
      <canvas
        ref={myCanvasRef}
        className="whiteboard__layer whiteboard__layer--me"
        onPointerDown={startDrawing}
        onPointerUp={finishDrawing}
        onPointerMove={drawing}
        onPointerCancel={finishDrawing}
        onClick={handleStamp}
      ></canvas>

      <FlipIndicator isDrawMode={isDrawMode} />
    </article>
  );
};

export default Whiteboard;
