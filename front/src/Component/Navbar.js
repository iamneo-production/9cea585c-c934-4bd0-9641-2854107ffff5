import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link} from 'react-router-dom';

function Navheader() {
  return (
      <Navbar expand="lg" variant="light" bg='light' className="bg-glass fixed-top" >
        <Container>
          <Navbar.Brand as={Link} to={"/Home"}>
            <img
              src="./logo512.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto font-weight-bold" variant="pills" activeKey="/home">
              <Nav.Item>
                <Nav.Link as={Link} to={"/Home"}>HOME</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to={"/About"}>ABOUT US</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to={"/Contact"}>CONTACT US</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Button as={Link} to={"/Session"} variant="outline-primary">Login/Register</Button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
  );
}

export default Navheader;
