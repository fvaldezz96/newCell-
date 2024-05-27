
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import './LandingPage.css'

const items = [
  {
    src: 'https://apple2fan.com/wp-content/uploads/2020/10/Captura-de-pantalla-2020-10-13-a-las-19.46.59.png',
    alt: 'Image 1',
  },
  {
    src: 'https://depor.com/resizer/O77xSXFS32q6W_y3F147RtBfp1Q=/1200x675/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/ECBYORMINFGF3HOTNUQCQ7QCXI.webp',
    alt: 'Image 2',
  },
  {
    src: 'https://i0.wp.com/apperlas.com/wp-content/uploads/2016/09/iPhone-7-agua.jpg?ssl=1',
    alt: 'Image 3',
  },
  {
    src: 'https://hd2.tudocdn.net/893603?w=1920',
    alt: 'Image 4',
  },
  {
    src: 'https://clongeek.com/wp-content/uploads/2021/03/iPhone-13-1.jpg',
    alt: 'Image 5',
  },
  {
    src: 'https://www.cined.com/content/uploads/2020/02/galaxy_s20_ultra_2-1300x750.jpg',
    alt: 'Image 6',
  },
];

const LandingPage = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, event) => {
    setIndex(selectedIndex);
  };
  return (
    <div>
      <Carousel activeIndex={index} onSelect={handleSelect} >
        {items.map((item, i) => (
          <Carousel.Item key={i} className="my-carousel-container">
            <img
              className="img-carousel w-100"
              src={item.src}
              alt={item.alt}
            />
            <Carousel.Caption>
              <h5>{i + 1}</h5>
              <p>Img de prueba {i + 1}.</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )
}

export default LandingPage