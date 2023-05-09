import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Home from '../Component/Home';
import About from '../Component/About';
import Contact from '../Component/Contact';
import Session from '../Component/Session';
import './Navheader.css';

function Navheader() {
    return (
        <HashRouter>
            <Navbar expand="lg" variant="light" className="bg-glass">
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
                    <Nav className="justify-content-end" variant="pills" activeKey="/home">
                        <Nav.Item>
                            <Nav.Link as={Link} to={"/Home"} className="nav-link-style">HOME</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to={"/About"} className="nav-link-style">ABOUT US</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to={"/contact"} className="nav-link-style">CONTACT US</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Button as={Link} to={"/Session"}>Login/Register</Button>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
            <div className="body-container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/Session" element={<Session />} />
                </Routes>
            </div>
        </HashRouter>
    );
}

export default Navheader;
