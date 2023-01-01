import "./Whiteboard.scss";
//React Hooks
import { useEffect, useState, useRef } from "react";
//Assets
import drawIcon from "../../assets/images/icons/draw.svg";
import stampIcon from "../../assets/images/icons/focus.svg";
//Utility Functions
import { randomNumber } from "../../utilities/utilities";

const Whiteboard = ({ isDrawModeStamp }) => {
  //State variable
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeColor, setStrokeColor] = useState("");
  //useRef variables
  const captureCanvasRef = useRef(null);
  const captureContextRef = useRef(null);
  const peerCanvasRef = useRef(null);
  const peerContextRef = useRef(null);
  const myCanvasRef = useRef(null);
  const myContextRef = useRef(null);

  //Set Canvas
  useEffect(() => {
    captureContextRef.current = captureCanvasRef.current.getContext("2d");
    peerContextRef.current = peerCanvasRef.current.getContext("2d");
    myContextRef.current = myCanvasRef.current.getContext("2d");

    setStrokeColor(
      `rgb(${randomNumber(255)}, ${randomNumber(255)}, ${randomNumber(255)})`
    );
  }, []);

  //Stamping Tool
  const handleStamp = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    if (isDrawModeStamp) {
      console.log(offsetX, offsetY);
      myContextRef.current.strokeStyle = strokeColor;
      myContextRef.current.beginPath();
      myContextRef.current.lineWidth = 5;
      myContextRef.current.arc(offsetX, offsetY, 10, 0, 2 * Math.PI);
      myContextRef.current.stroke();
      myContextRef.current.closePath();
    }
  };

  //Drawing Tool
  //Start Drawing - Mouse
  const startDrawing = ({ nativeEvent }) => {
    if (!isDrawModeStamp) {
      const { offsetX, offsetY } = nativeEvent;
      console.log(offsetX, offsetY);
      myContextRef.current.beginPath();
      myContextRef.current.moveTo(offsetX, offsetY);
      myContextRef.current.strokeStyle = strokeColor;
      setIsDrawing(true);
    }
  };
  //While Drawing - Mouse
  const drawing = ({ nativeEvent }) => {
    if (!isDrawing) return;
    myContextRef.current.lineWidth = 5;
    const { offsetX, offsetY } = nativeEvent;
    myContextRef.current.lineTo(offsetX, offsetY);
    myContextRef.current.stroke();
  };
  //Finish Drawing - Mouse
  const finishDrawing = () => {
    if (!isDrawing) return;
    myContextRef.current.closePath();
    setIsDrawing(false);
  };

  return (
    <article className="whiteboard">
      <canvas ref={captureCanvasRef} className="whiteboard__layer"></canvas>
      <canvas
        ref={peerCanvasRef}
        className="whiteboard__layer whiteboard__layer--peer"
      ></canvas>
      <canvas
        ref={myCanvasRef}
        className="whiteboard__layer whiteboard__layer--me"
        onPointerDown={startDrawing}
        onPointerUp={finishDrawing}
        onPointerMove={drawing}
        onPointerCancel={finishDrawing}
        onClick={handleStamp}
      ></canvas>

      {isDrawModeStamp ? (
        <div className="whiteboard__tool-indicator">
          <img src={stampIcon} alt="Stamp Icon" className="whiteboard__icon" />
        </div>
      ) : (
        <div className="whiteboard__tool-indicator">
          <img src={drawIcon} alt="Draw Icon" className="whiteboard__icon" />
        </div>
      )}
    </article>
  );
};

export default Whiteboard;
