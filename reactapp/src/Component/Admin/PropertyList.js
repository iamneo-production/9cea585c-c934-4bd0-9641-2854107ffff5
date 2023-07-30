import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Carousel, Col, Container, Form, Modal, Row, Table, Toast } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function PropertyList() {
  const [searchId, setSearchId] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errorToast, setErrorToast] = useState(null);
  const [successToast, setSuccessToast] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://8080-eddfcabaeaccfeddcfcdcebdafbeaeaadbdbabf.project.examly.io/properties/admin', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProperties(response.data);
      } catch (error) {
        setErrorToast('Error fetching properties. Please try again later.');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterProperties = () => {
      let filtered = properties;

      if (searchId) {
        filtered = filtered.filter((property) => property.id.toString() === searchId);
      }

      if (searchKeyword) {
        const keyword = searchKeyword.toLowerCase();
        filtered = filtered.filter(
          (property) =>
            property.title.toLowerCase().includes(keyword) ||
            property.description.toLowerCase().includes(keyword) ||
            property.address.toLowerCase().includes(keyword) ||
            property.type.toLowerCase().includes(keyword) ||
            property.status.toLowerCase().includes(keyword)
        );
      }

      setFilteredProperties(filtered);
    };

    filterProperties();
  }, [searchId, searchKeyword, properties]);

  const openModal = (property) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedProperty(null);
    setShowModal(false);
  };

  const handleEdit = (propertyData) => {
    navigate('/EditProperty', { state: { propertyData } });
  };

  const deleteProperty = async (propertyId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Property?');
    if (confirmDelete) {
      try {
        await axios.delete(`https://8080-eddfcabaeaccfeddcfcdcebdafbeaeaadbdbabf.project.examly.io/properties/${propertyId}`);
        setProperties(properties.filter((property) => property.id !== propertyId));
        setSuccessToast('Property deleted successfully.');
      } catch (error) {
        setErrorToast('Failed to delete the property. Property might be purchased.');
      }
    }
  };

  return (
    <Container className="border-0 shadow rounded-3 p-sm-2" style={{ marginTop: '20px', marginBottom: '20px' }}>
      <h4 className="mx-auto font-weight-bold card-title text-center mt-4 mb-3">All Property Details</h4>
      <Row className="justify-content-center mb-3">
        <Col xs={12} sm={6} className="mb-3">
          <Form.Label>Search by Property Id:</Form.Label>
          <Form.Control type="number" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
        </Col>
        <Col xs={12} sm={6} className="mb-3">
          <Form.Label>Search by Keyword:</Form.Label>
          <Form.Control type="text" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
        </Col>
      </Row>
      <div style={{ maxHeight: '350px', overflow: 'auto' }}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Address</th>
              <th>Type</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <tr key={property.id}>
                  <td>{property.id}</td>
                  <td>{property.title}</td>
                  <td>{property.address}</td>
                  <td>{property.type}</td>
                  <td>{property.price}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(property)}>
                      View
                    </Button>{' '}
                    <Button variant="danger" onClick={() => deleteProperty(property.id)}>
                      Delete
                    </Button>{' '}
                    <Button variant="warning" onClick={() => handleEdit(property)}>
                      Edit
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center">
                  No properties found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={closeModal} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Property Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProperty && (
            <Container>
              <Row>
                <Col md={6}>
                  <Carousel>
                    {selectedProperty.imageUrls.map((imageUrl) => (
                      <Carousel.Item key={imageUrl}>
                        <img
                          className='d-block w-100'
                          src={`${imageUrl}`}
                          alt='Property{key}'
                          style={{ width: "400px", height: "300px", objectFit: 'cover' }}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </Col>
                <Col md={6}>
                  <h5>Title: {selectedProperty.title}</h5>
                  <p>Description: {selectedProperty.description}</p>
                  <p>Address: {selectedProperty.address}</p>
                  <p>Type: {selectedProperty.type}</p>
                  <p>Status: {selectedProperty.status}</p>
                  <p>Price: {selectedProperty.price}</p>
                  <p>Features: {selectedProperty.features.join(', ')}</p>
                </Col>
              </Row>

              {selectedProperty.agent && (
                <Row>
                  <h5>Agent Details:</h5>
                  <Col md={3}>
                    <img
                      src={`${selectedProperty.agent.profileImageUrl}`}
                      alt='Agent Profile'
                      style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                    />
                  </Col>
                  <Col md={2}>
                    <Col>
                      <p>ID: {selectedProperty.agent.id}</p>
                      <p>Name: {selectedProperty.agent.name}</p>
                      <p>Email: {selectedProperty.agent.email}</p>
                      <p>Phone: {selectedProperty.agent.phone}</p>
                    </Col>
                  </Col>
                </Row>
              )}
            </Container>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {errorToast && (
        <Toast
          show={true}
          onClose={() => setErrorToast(null)}
          delay={5000}
          autohide
          style={{ position: 'absolute', top: 20, right: 20 }}
        >
          <Toast.Header>
            <strong className="mr-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>{errorToast}</Toast.Body>
        </Toast>
      )}

      {successToast && (
        <Toast
          show={true}
          onClose={() => setSuccessToast(null)}
          delay={5000}
          autohide
          style={{ position: 'absolute', top: 20, right: 20 }}
        >
          <Toast.Header>
            <strong className="mr-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>{successToast}</Toast.Body>
        </Toast>
      )}
    </Container>
  );
}

export default PropertyList;
