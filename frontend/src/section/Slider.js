import React, { useState, useEffect } from "react";
import "./Slider.css";

const images = [
  "/assets/vinculacion.jpg",
  "/assets/vinculacion2.jpg",
  "/assets/vinculacion3.jpg",
];

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-container">
      <div
        className="slider-wrapper"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Slide ${index}`} className="slider-image" />
        ))}
      </div>
    </div>
  );
}

export default Slider;
