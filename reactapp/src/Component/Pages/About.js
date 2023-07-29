import React from 'react';
import { Card, Carousel, Col, Container, Row } from 'react-bootstrap';

function AboutUs() {
  return (
    <Container>
      <h1 className="text-center">About Us</h1>

      <Row className="mt-5">
        <Col md={6} className="order-md-1">
          <h1>Team Leader</h1>
          <p className="mt-5">Meet our CEO, Hussie, a visionary leader in the online real estate management system industry. With a deep understanding of both technology and real estate, he has successfully guided our company to the forefront of the digital transformation in property management. His strategic thinking and innovative mindset have been instrumental in developing cutting-edge solutions that streamline operations and enhance efficiency for our clients.</p>
        </Col>
        <Col md={6} className="order-md-2">
          <div className="d-flex justify-content-center">
            <div className="rounded-circle overflow-hidden" style={{ width: '200px', height: '200px' }}>
              <img src="./Assets/Images/t1.jpg" alt="teamleader" className="w-100 h-100 object-fit-cover" />
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={6} className="order-md-1">
          <div className="d-flex justify-content-center">
            <div className="rounded-circle overflow-hidden" style={{ width: '200px', height: '200px' }}>
              <img src="./Assets/Images/t2.jpg" alt="Real Estate Agent" className="w-100 h-100 object-fit-cover" />
            </div>
          </div>
        </Col>
        <Col md={6} className="order-md-2">
          <h1>Real Estate Agent</h1>
          <p className="mt-5">Meet our real estate agent, Santner. He is a dedicated Real Estate Agent with expertise in buying and selling residential and commercial properties. With in-depth knowledge of the real estate market, he assists clients in finding the perfect properties that align with their specific needs and budget requirements.</p>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={6} className="order-md-1">
          <h1>Property Manager</h1>
          <p className="mt-5">Meet our property manager, Jackie. He is a highly skilled Property Manager with a strong focus on ensuring efficient property operations. With his expertise knowledge in maintenance, he plays a vital role in maximizing property value and ensuring customer satisfaction.</p>
        </Col>
        <Col md={6} className="order-md-2">
          <div className="d-flex justify-content-center">
            <div className="rounded-circle overflow-hidden" style={{ width: '200px', height: '200px' }}>
              <img src="./Assets/Images/t3.jpg" alt="Property Manager" className="w-100 h-100 object-fit-cover" />
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <Carousel indicators={false} interval={3000} pause={false} className="mt-3">
            <Carousel.Item>
              <img className="d-block w-100" src="./Assets/Images/h.jpg" alt="image1" />
              <Carousel.Caption>
                <h2>Who we are?</h2>
                <p>We are a team of dedicated professionals passionate about providing exceptional real estate management services. With years of experience in the industry, we have built a strong reputation for our commitment to excellence and client satisfaction.</p>
              </Carousel.Caption>
            </Carousel.Item>
            {/* Additional carousel items */}
          </Carousel>
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
                {/* Additional carousel items */}
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
