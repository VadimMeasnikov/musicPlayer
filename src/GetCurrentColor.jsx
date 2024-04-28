import React, { useEffect, useRef, useState } from 'react';

const GetCurrentColor = ({ imageUrl, onColorGenerated }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = imageUrl;

    image.onload = function () {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0, image.width, image.height);

      const imageData = context.getImageData(0, 0, image.width, image.height).data;

      let red = 0;
      let green = 0;
      let blue = 0;

      for (let i = 0; i < imageData.length; i += 4) {
        red += imageData[i];
        green += imageData[i + 1];
        blue += imageData[i + 2];
      }

      const pixelCount = imageData.length / 4;
      const averageRed = Math.floor(red / pixelCount);
      const averageGreen = Math.floor(green / pixelCount);
      const averageBlue = Math.floor(blue / pixelCount);

      const averageColor = `rgb(${averageRed}, ${averageGreen}, ${averageBlue})`;

      if (onColorGenerated) {
        onColorGenerated(averageColor);
      }
    };
  }, [imageUrl, onColorGenerated]);

  return <canvas ref={canvasRef} style={{ display: 'none' }} />;
};

export default GetCurrentColor;