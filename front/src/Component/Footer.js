import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navfooter() {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <Container>
        <Nav className="justify-content-center">
          <Nav.Item>
            <Nav.Link as={Link} to="/Home">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/About">About Us</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/Contact">Contact Us</Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </footer>
  );
}

export default Navfooter;
