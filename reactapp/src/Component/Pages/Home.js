import React from 'react';
import { Carousel, Container } from 'react-bootstrap';
import PropertyListing from './PropertyListing';

function Home() {
  const carouselItems = [
    {
      id: 1,
      title: "Carousel Item 1",
      image: "https://assets.site-static.com/userFiles/2464/image/real-estate-investment-types.jpg",
    },
    {
      id: 2,
      title: "Carousel Item 2",
      image: "https://www.vidyard.com/media/real-estate-video-marketing-1920x1080-1.jpg",
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
