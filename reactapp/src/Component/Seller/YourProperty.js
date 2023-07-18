import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function YourProperty() {
  const navigate = useNavigate();
  const [userProperties, setUserProperties] = useState([]);

  const fetchUserProperties = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`https://8080-dfafaaeeddfbcddcfcdcebdafbcfcbaedbffbeeaadbbb.project.examly.io/agents/properties/${userId}`);
      setUserProperties(response.data);
    } catch (error) {
      console.error('Error fetching user properties:', error);
    }
  };

  useEffect(() => {
    fetchUserProperties();
  }, []);

  const handleDelete = async (propertyId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Property?');
    if (confirmDelete) {
      try {
        await axios.delete(`https://8080-dfafaaeeddfbcddcfcdcebdafbcfcbaedbffbeeaadbbb.project.examly.io/properties/${propertyId}`);
        fetchUserProperties(); // Refresh the properties after deletion
      } catch (error) {
        alert('Property Had Purchased cant Remove It');
        console.error('Error deleting property:', error);
      }
    }
  };

  const handleEdit = (propertyData) => {
    console.log(propertyData);
    navigate('/EditProperty', { state: { propertyData } });
  };

  return (
    <Container>
      <h4 className="mx-auto font-weight-bold card-title text-center mt-4 mb-3">Your Property</h4>
      <Row className="justify-content-center mt-4">
          {userProperties.length === 0 ? (
            <Col xs={12} className="text-center">
              <p>No properties found.</p>
            </Col>
          ) : (
            userProperties.map((property) => (
              <Col key={property.id} xs={12} md={4} className="mb-4">
                <Card>
                  <div style={{ width: '100%', height: '150px', overflow: 'hidden' }}>
                    <Card.Img
                      variant="top"
                      src={'./Assets/PropertyMedia/' + property.imageUrls[0]}
                      alt={property.title}
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title className="text-truncate mb-2">
                      {property.title}
                    </Card.Title>
                    <Card.Text className="text-truncate mb-2">
                      {property.address}
                    </Card.Text>
                    <Card.Text className="mb-2">
                      <strong>Type:</strong> {property.type}
                    </Card.Text>
                    <Card.Text className="mb-2">
                      <strong>Price:</strong> {property.price}
                    </Card.Text>
                    <Row className="justify-content-center">
                      <Col xs="auto">
                        <Button as={Link} to={`/PropertyDescription/${property.id}`} variant="primary">
                          View Details
                        </Button>
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col>
                        <Button variant="warning" onClick={() => handleEdit(property)}>
                          Edit
                        </Button>
                      </Col>
                      <Col className="d-flex justify-content-end">
                        <Button variant="danger" onClick={() => handleDelete(property.id)}>
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
    </Container>
  );
}

export default YourProperty;
