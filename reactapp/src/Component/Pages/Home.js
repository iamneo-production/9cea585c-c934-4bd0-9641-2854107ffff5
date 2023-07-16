import React from 'react';
import { Carousel, Container } from 'react-bootstrap';
import PropertyListing from './PropertyListing';

function Home() {
  const carouselItems = [
    {
      id: 1,
      title: "Carousel Item 1",
      image: "./Assets/Images/Slider1.jpg",
    },
    {
      id: 2,
      title: "Carousel Item 2",
      image: "./Assets/Images/Slider2.jpg",
    },
  ];

  return (
    <Container>
      <Carousel className="mb-5 align-items-center">
        {carouselItems.map((item) => (
          <Carousel.Item key={item.id}>
            <img
              className="d-block w-100"
              src={item.image}
              alt={item.title}
              style={{ height: "350px" }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <PropertyListing />
    </Container>
  );
}

export default Home;