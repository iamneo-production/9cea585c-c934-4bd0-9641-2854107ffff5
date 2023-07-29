import React from 'react';
import { Card, Carousel, Col, Container, Row } from 'react-bootstrap';

function AboutUs() {
  return (
    <Container>
      <h1 className="text-center">About Us</h1>
      <Card className="p-4 bg-light" ><h2 className="text-center">Welcome to RE-Team32</h2>
      <Card.Body><p>We are dedicated to providing exceptional real estate management services that cater to the unique needs of property owners, tenants, and investors. With years of experience in the industry, we have established ourselves as a trusted partner in property management and are committed to delivering superior results.</p></Card.Body></Card>
      <Row className="mt-5">
      <Col md={4}>
        <Card>
          <Card.Body>
            <Card.Title>Admin</Card.Title>
            <Card.Text>
            Admin can easily check property details, approve  property listings. With their administrative capabilities, they streamline the property management process and ensure that all property-related operations run smoothly.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card>
          <Card.Body>
            <Card.Title>Seller</Card.Title>
            <Card.Text>
            Sellers can seamlessly register and login to access their personalize accounts. Once logged in, they can effortlessly post their properties for sale or rent, gaining exposure to a wide audience of potential buyers and tenants.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card>
          <Card.Body>
            <Card.Title>Buyer</Card.Title>
            <Card.Text>
            Buyers can conveniently register and log in to their personalized accounts. Once logged in, they can easily search for properties that align with their preferences and requirements, enabling them to find and buy their dream property effortlessly.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
<Row className="mt-5">
<Col>
<Card className="p-4 bg-light">
      <Card.Body>
  <Carousel indicators={false} interval={3000} pause={false} className="mt-3">
    <Carousel.Item>
      <h2 className="text-center">Who we are?</h2>
        <p>We are a team of dedicated professionals passionate about providing exceptional real estate management services. With years of experience in the industry, we have built a strong reputation for our commitment to excellence and client satisfaction.</p>
    </Carousel.Item>
    <Carousel.Item>
        <h2 className="text-center">What is our mission?</h2>
        <p>Our mission is to simplify and streamline the real estate management process for property owners, investors, and tenants alike. We understand the complexities and challenges that come with property management, and our goal is to make it a seamless and rewarding experience for our clients.</p>
    </Carousel.Item>
    <Carousel.Item>
        <h2 className="text-center">Why choose us?</h2>
        <p>What sets us apart is our comprehensive range of services designed to address all your real estate needs. Whether you are looking to buy or sell a property, need property management solutions, real estate investment advice, or expert consulting services, we have you covered.</p>
    </Carousel.Item>
    <Carousel.Item>
        <h2 className="text-center">What we provide</h2>
        <p>With our comprehensive range of services, we offer solutions designed to address all your real estate requirements. Whether you're looking to buy or sell a property, our experienced team will guide you through the process with expertise and care. We also offer property management solutions to ensure your investments are well-maintained, real estate investment advice to maximize returns, and expert consulting services to navigate complex transactions seamlessly.</p>
    </Carousel.Item>
    <Carousel.Item>
        <h2 className="text-center">We guide you</h2>
        <p>Our dedicated support team is always ready to assist you with any questions or concerns you may have. We are here to guide you through every step of the real estate management journey, providing expert advice, reliable support, and exceptional service.</p>
    </Carousel.Item>
    <Carousel.Item>
        <h2 className="text-center">Contact us</h2>
        <p>Have questions or need assistance? Contact our friendly support team. We're available to answer your inquiries, schedule property viewings, and provide support throughout your real estate journey.</p>
    </Carousel.Item>
  </Carousel>
  </Card.Body>
    </Card>
    </Col>
</Row>
      <Row className="mt-5">
        <Col>
          <Card className="p-4 bg-light">
            <Card.Body>
              <h2 className="text-center">Customers Review</h2>
              <Carousel indicators={false} interval={3000} pause={false} className="mt-3">
                <Carousel.Item>
                  <p className="text-center">'Excellent service! The team was very professional and helped me find my dream home.' - Chris</p>
                </Carousel.Item>
                <Carousel.Item>
              <p className="text-center">'I had a great experience working with the team. They made the selling process very smooth and hassle-free.' - John</p>
          </Carousel.Item>
          <Carousel.Item>
              <p className="text-center">'Highly recommend their services. They went above and beyond to ensure I got the best deal for my investment property.' - Tim</p>
          </Carousel.Item>
              </Carousel>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <p className="text-center mt-5">"We are committed to providing the best real estate services possible to help our clients achieve their goals."</p>
    </Container>
  );
}

export default AboutUs;