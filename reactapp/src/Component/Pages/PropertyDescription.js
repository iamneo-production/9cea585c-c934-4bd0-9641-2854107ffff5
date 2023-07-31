import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Carousel, Col, Container, Modal, Nav, OverlayTrigger, Popover, Row, Toast } from 'react-bootstrap';
import { FaCheck, FaHome, FaInfoCircle, FaMapMarkerAlt, FaRupeeSign } from 'react-icons/fa';
import { GiBarbecue, GiBedLamp, GiSofa } from 'react-icons/gi';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../UserProvider';

import axios from "axios";

const PropertyDescription = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const { id } = useParams();

  const { userRole } = useContext(UserContext);
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate('/Payment', { state: { property } });
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`https://8080-feaaeedcbbebeeddcfcdcebdafbeaeaadbdbabf.project.examly.io/properties/${id}`);
        setProperty(response.data);
        setLoading(false);
      } catch (error) {
        showToastMessage('error', 'Failed to fetch property.');
      }
    };
    fetchProperty();
  }, [id]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };

  const showToastMessage = (type, message) => {
    setToastType(type);
    setToastMessage(message);
    setShowToast(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container>
        <Card>
          <Carousel>
            {property.imageUrls.map((image, index) => (
              <Carousel.Item key={image}>
                <img
                  className="d-block w-100"
                  src={`${image}`}
                  alt="Images"
                  style={{ height: '50vh', objectFit: 'cover' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <Card.Body className="p-3">
            <Row>
              <Col md={4}>
                <Card.Title style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                  {property.title}
                </Card.Title>
              </Col>
              <Col md={{ span: 4, offset: 3 }}>
                <Card.Text style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
                  <FaRupeeSign style={{ marginRight: '0.1rem' }} />
                  Price: {property.price}
                </Card.Text>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card.Text style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
                  <FaMapMarkerAlt style={{ marginRight: '0.5rem' }} /> Address: {property.address}
                </Card.Text>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card.Text style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
                  <FaInfoCircle style={{ marginRight: '0.5rem' }} /> {property.description}
                </Card.Text>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Card.Text style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
                  <FaHome style={{ marginRight: '0.5rem' }} /> Type: {property.type}
                </Card.Text>
              </Col>
              <Col md={{ span: 4, offset: 3 }}>
                <Card.Text style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
                  <FaCheck style={{ marginRight: '0.5rem' }} /> Status: {property.status}
                </Card.Text>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card.Text style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
                  <FaCheck style={{ marginRight: '0.5rem' }} /> Features: {property.features.join(', ')}
                </Card.Text>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col className="d-flex justify-content-center gap-3">
                {userRole === 'buyer' && (
                  <>
                    <Button variant="primary" onClick={handleBuyNow}>
                      Buy Now
                    </Button>

                    <Button variant="secondary" onClick={handleShowModal}>
                      Contact Seller
                    </Button>
                  </>
                )}
                {userRole === 'seller' && (
                  <>
                    <OverlayTrigger
                      trigger="click"
                      placement="top"
                      overlay={
                        <Popover>
                          <Popover.Header as="h3">Access Denied</Popover.Header>
                          <Popover.Body>Only buyers can access this.</Popover.Body>
                        </Popover>
                      }
                    >
                      <Button variant="primary">Buy Now</Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                      trigger="click"
                      placement="top"
                      overlay={
                        <Popover>
                          <Popover.Header as="h3">Access Denied</Popover.Header>
                          <Popover.Body>Sellers cannot access this.</Popover.Body>
                        </Popover>
                      }
                    >
                      <Button variant="secondary">Contact Seller</Button>
                    </OverlayTrigger>
                  </>
                )}
                {userRole !== 'buyer' && userRole !== 'seller' && (
                  <>
                    <OverlayTrigger
                      trigger="click"
                      placement="top"
                      overlay={
                        <Popover>
                          <Popover.Header as="h3">Login Required</Popover.Header>
                          <Popover.Body>Login as a buyer to continue.</Popover.Body>
                        </Popover>
                      }
                    >
                      <Button variant="primary">Buy Now</Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                      trigger="click"
                      placement="top"
                      overlay={
                        <Popover>
                          <Popover.Header as="h3">Login Required</Popover.Header>
                          <Popover.Body>Login as a buyer to continue.</Popover.Body>
                        </Popover>
                      }
                    >
                      <Button variant="secondary">Contact Seller</Button>
                    </OverlayTrigger>
                  </>
                )}
              </Col>
            </Row>
          </Card.Body>

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Agent Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className="align-items-center">
                <Col xs={4} className="text-center">
                  <img
                    src={`${property.agent.profileImageUrl}`}
                    alt="Agent Profile"
                    style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                  />
                </Col>
                <Col xs={8}>
                  <div className=" flex-column align-items-center h-100">
                    <p>Name: {property.agent.name}</p>
                    <p>Phone: {property.agent.phone}</p>
                    <p>Email: {property.agent.email}</p>
                  </div>
                </Col>
              </Row>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Card>

        <Nav variant="pills" activeKey={activeTab} onSelect={handleTabSelect} className="mt-3" fill>
          <Nav.Item>
            <Nav.Link eventKey="about">About Property</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="floor-plan">Floor Plan</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="amenities">Amenities</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="nearby-locations">Nearby Locations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="videos">Videos</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="features">Features</Nav.Link>
          </Nav.Item>
        </Nav>
        <Container fluid className="p-3 mt-3" style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', minHeight: '300px' }}>
          {activeTab === 'about' && (
            <div>
              <h3>About Property</h3>
              <p>{property.description}</p>
            </div>
          )}
          {activeTab === 'floor-plan' && (
            <div className="d-flex justify-content-center align-items-center">
              <img
                src="https://wpmedia.roomsketcher.com/content/uploads/2022/01/06145940/What-is-a-floor-plan-with-dimensions.png"
                alt="Floor Plan"
                style={{ maxWidth: '100%', maxHeight: '400px' }}
              />
            </div>
          )}
          {activeTab === 'amenities' && (
            <div>
              <h3>Amenities</h3>
              <ul>
                <li>
                  <GiSofa /> Sofa
                </li>
                <li>
                  <GiBarbecue /> Barbecue Area
                </li>
                <li>
                  <GiBedLamp /> Bedside Lamp
                </li>
              </ul>
            </div>
          )}
          {activeTab === 'nearby-locations' && (
            <div>
              <p>Here are some nearby locations:</p>
              <ul>
                <li>Supermarket</li>
                <li>Public Park</li>
                <li>Pharmacy</li>
                <li>Restaurant</li>
              </ul>
            </div>
          )}
          {activeTab === 'videos' && (
            <div className="d-flex justify-content-center align-items-center">
              <iframe
                width="560"
                height="315"
                src={`${property.videoUrls[0]}`}
                title="Property Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
          {activeTab === 'features' && (
            <div>
              <h3>Features</h3>
              <p>This property has the following features:</p>
              <ul>
                {property.features.map((feature,) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </Container>

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        style={{
          position: 'fixed',
          top: '80px',
          right: '20px',
          zIndex: 9999,
        }}
        delay={3000}
        autohide
      >
        <Toast.Header>
          {toastType === 'success' ? (
            <FaCheck style={{ color: '#28a745', marginRight: '8px' }} />
          ) : (
            <FaInfoCircle style={{ color: '#dc3545', marginRight: '8px' }} />
          )}
          <strong className="mr-auto">{toastType === 'success' ? 'Success' : 'Error'}</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </>
  );
};

export default PropertyDescription;
