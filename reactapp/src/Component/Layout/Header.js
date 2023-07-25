import React, { useContext, useState } from 'react';
import { Button, Container, Dropdown, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { FaHeart, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Session from '../Pages/Session';
import { UserContext } from '../UserProvider';

function DefaultHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userType, setUserType] = useState('');

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleUserTypeSelect = (type) => {
    setUserType(type);
    setIsModalOpen(true);
  };

  return (
    <Navbar bg="light" expand="lg" >
      <Container>
        <Navbar.Brand as={Link} to="/Home">
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
          <Nav className="ms-auto">
            <Nav.Item>
              <Nav.Link as={Link} to="/Home">
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/About">
                About Us
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to={'/Contact'}>
                Contact Us
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/HelpCenter">
                Help Center
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Dropdown>
                <Dropdown.Toggle as={Button} variant="light">
                  Login/Register
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleUserTypeSelect('buyer')}>
                    Continue as Buyer
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleUserTypeSelect('seller')}>
                    Continue as Seller
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleUserTypeSelect('admin')}>
                    Continue as Admin
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
        <Session isModalOpen={isModalOpen} handleCancel={handleCancel} userType={userType} />
      </Container>
    </Navbar>
  );
}


function BuyerHeader() {
  const navigate = useNavigate();
  const { clearUser } = useContext(UserContext);

  const handleBuyerLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    clearUser();
    navigate('/Home');
  };

  const handleBuyerLogoutClick = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      handleBuyerLogout();
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/Home">
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
          <Nav className="ms-auto">
            <Nav.Item>
              <Nav.Link as={Link} to="/Home">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to={"/Propertylisting"}>Property Listing</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/About">About Us</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to={"/Contact"}>Contact Us</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/HelpCenter">Help Center</Nav.Link>
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
                /></Nav.Link>
            </Nav.Item>
            <NavDropdown title={<FaUser
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Account"
              data-bs-tooltip-custom-class="tooltip-custom"
            />} id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to={"/BuyerProfile"}>My Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleBuyerLogoutClick}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function SellerHeader() {
  const navigate = useNavigate();
  const { clearUser } = useContext(UserContext);

  const handleSellerLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    clearUser();
    navigate('/Home');
  };

  const handleSellerLogoutClick = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      handleSellerLogout();
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/Home">
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
          <Nav className="ms-auto">
            <Nav.Item>
              <Nav.Link as={Link} to="/Home">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to={"/Propertylisting"}>Property Listing</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to={"/Addproperty"}>Add Property</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/About">About Us</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to={"/Contact"}>Contact Us</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/HelpCenter">Help Center</Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav>
            <NavDropdown title={<FaUser
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Account"
              data-bs-tooltip-custom-class="tooltip-custom"
            />} id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to={"/SellerProfile"}>My Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleSellerLogoutClick}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


function AdminHeader() {
  const navigate = useNavigate();
  const { clearUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    clearUser();
    navigate('/Dashboard');
  };

  const handleLogoutClick = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      handleLogout();
    }
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/Home">
            <img
              src="./logo512.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Nav className="ms-auto">
            <NavDropdown
              title={
                <FaUser
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Account"
                  data-bs-tooltip-custom-class="tooltip-custom"
                />
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item onClick={handleLogoutClick}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

function Header() {
  const { userRole } = useContext(UserContext);

  if (userRole === 'buyer') {
    return <BuyerHeader />;
  }
  else if (userRole === 'seller') {
    return <SellerHeader />;
  }
  else if (userRole === 'admin') {
    return <AdminHeader />;
  } else {
    return <DefaultHeader />;
  }
}
export default Header;

