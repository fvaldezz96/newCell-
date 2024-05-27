
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import './LandingPage.css'
import items from './JsonData.js';
const dataJson = items
const CarouselComponent = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, event) => {
    setIndex(selectedIndex);
  };
  return (
    <div>
      <Carousel activeIndex={index} onSelect={handleSelect} >
        {dataJson.map((item, i) => (
          <Carousel.Item key={i} className="my-carousel-container">
            <img
              className="img-carousel w-100"
              src={item.src}
              alt={item.alt}
            />
            <Carousel.Caption>
              <h5>{i + 1}</h5>
              <p>Images de prueba</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )
}

export default CarouselComponent
