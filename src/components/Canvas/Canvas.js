import React from 'react'
import './Canvas.scss';

const Canvas = ({canvasRef}) => {

    const handleDownload = (event) => {
        console.log(event.target);
        console.log(event.target.toDataURL());
    }


  return (
    <canvas ref={canvasRef} className='canvas' onClick={handleDownload}></canvas>
  )
}

export default Canvas