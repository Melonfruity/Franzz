import React, { useState, useRef, useEffect } from 'react';
import './Canvas.css';

const Canvas = () => {
  const canvasRef = useRef(null);
  let context;
  let drawing = false;

  const points = {
    color: 'black',
  };

  // Using the useEffect callback function to grab the canvas after render and setContext
  useEffect(() => {
    if (canvasRef.current) {
      context = canvasRef.current.getContext('2d');
    }
  }, []);

  const drawLine = (x0, y0, x1, y1, color, emit) => {
    console.log(x0, y0, x1, y1, color, context);
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();
    context.closePath();
  };

  const mouseDown = (e) => {
    drawing = true;
    points.x = e.clientX;
    points.y = e.clientY;
  };

  const mouseUp = (e) => {
    // eslint-disable-next-line no-useless-return
    if (!drawing) { return; }
    drawing = false;
    drawLine(points.x, points.y, e.clientX, e.clientY, points.color, true);
  };

  const mouseMove = (e) => {
    // eslint-disable-next-line no-useless-return
    if (!drawing) { return; }
    drawLine(points.x, points.y, e.clientX, e.clientY, points.color, true);
    points.x = e.clientX;
    points.y = e.clientY;
  };

  return (
    <div>
      <canvas
        className="whiteboard"
        style={{border: "1px solid black"}}
        ref={canvasRef}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        onMouseMove={mouseMove}
        onMouseOut={mouseUp}
        onFocus={() => {}}
        onBlur={ () => {} }
      />
    </div>
  );
};

export default Canvas;
