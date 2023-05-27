import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import {Link } from 'react-router-dom';
import { FaHeart, FaUser } from 'react-icons/fa';

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
                            <Nav.Link as={Link} to={"/Propertylisting"}>PROPERTY LISTING</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to={"/Addproperty"}>ADD PROPERTY</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to={"/About"}>ABOUT US</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to={"/contact"}>CONTACT US</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav>
                        <Nav.Item>
                            <Nav.Link as={Link} to={"/Favproperty"}>
                                <FaHeart
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="bottom"
                                    title="Favorites"
                                    data-bs-tooltip-custom-class="tooltip-custom"
                                    style={{ fontSize: "1.4rem", marginLeft: "1rem" }}
                                /></Nav.Link>
                        </Nav.Item>
                        <NavDropdown title={<FaUser
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            title="Account"
                            data-bs-tooltip-custom-class="tooltip-custom"
                            style={{ fontSize: "1.2rem", marginLeft: "1rem" }}
                        />} id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to={"/Profile"}>My Profile</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/Settings"}>Settings</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to={"/Logout"}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navheader;
