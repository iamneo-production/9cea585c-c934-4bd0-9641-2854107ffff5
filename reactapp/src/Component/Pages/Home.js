import React from 'react';
import { Carousel, Container } from 'react-bootstrap';
import PropertyListing from './PropertyListing';

function Home() {
  const carouselItems = [
    {
      id: 1,
      title: "Carousel Item 1",
      image: "https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg",
    },
    {
      id: 2,
      title: "Carousel Item 2",
      image: "https://etimg.etb2bimg.com/photo/82709573.cms",
    },
    {
      id: 3,
      title: "Carousel Item 3",
      image: "https://cdn.dnaindia.com/sites/default/files/styles/full/public/2019/02/21/793760-realestate-istock-022119.jpg",
    },
  ];

  return (
    <Container>
      <Carousel className="mb-5 align-items-center">
        {carouselItems.map((item) => (
          <Carousel.Item key={item.id}>
            <div
              className="carousel-image"
              style={{ backgroundImage: `url(${item.image})`, height: "400px", backgroundSize: "cover", backgroundPosition: "center" }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <PropertyListing />
    </Container>
  );
}

export default Home;
