import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Toast } from 'react-bootstrap';

function Account ()  {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    address: '',
  });

  const [editMode, setEditMode] = useState(false); // Track edit mode
  const [errorToast, setErrorToast] = useState(null);
  const [successToast, setSuccessToast] = useState(null);
  const fetchUserData = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`https://8080-eddfcabaeaccfeddcfcdcebdafbcfcbaedbffbeeaadbbb.project.examly.io/users/id?id=${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const userData = response.data;

      setFormData(userData);
    } catch (error) {
      setErrorToast('Error fetching user data');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [editMode]);



  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const isPhoneNumberValid = (phone) => {
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(phone);
  };

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleEdit = () => {
    setEditMode(true); // Enable edit mode
  };

  const handleSave = async () => {
    try {
      await axios.put(`https://8080-eddfcabaeaccfeddcfcdcebdafbcfcbaedbffbeeaadbbb.project.examly.io/users/`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setEditMode(false); // Disable edit mode after successful update
      setSuccessToast('Profile updated successfully');
    } catch (error) {
      setErrorToast('Error updating user data');
    }
  };

  const handleCancel = () => {
    setEditMode(false); // Disable edit mode and revert changes
    // Fetch the original user data again to reset the form
    fetchUserData();
  };

  return (
    <Container fluid className="justify-content-center align-items-center">
      <Row>
        <Col>
          <h4 className="mx-auto font-weight-bold card-title text-center mt-4 mb-3">My Profile</h4>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center">
        <Col sm={8}>
          <Form>
            <Row>
              <Col sm={6}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!editMode} // Disable input in view mode
                    required
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled // Disable editing of email address
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col sm={6}>
                <Form.Group controlId="phone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!editMode}
                    required
                    pattern="[0-9]{10}"
                    isValid={isPhoneNumberValid(formData.phone)}
                    isInvalid={!isPhoneNumberValid(formData.phone)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid phone number.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={!editMode}
                    required
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
                    isValid={isPasswordValid(formData.password)}
                    isInvalid={!isPasswordValid(formData.password)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Password must contain at least 8 characters, including uppercase, lowercase, and numeric characters.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col sm={12}>
                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              <Row className="justify-content-center p-3">
                <Col xs={12} className="text-center">
                  {!editMode && ( // Show edit button in view mode
                    <Button variant="secondary" onClick={handleEdit}>
                      Edit Profile
                    </Button>
                  )}

                  {editMode && ( // Show save and cancel buttons in edit mode
                    <Row className="justify-content-center">
                      <Col xs={2}>
                        <Button variant="primary" onClick={handleSave}>
                          Save
                        </Button>
                      </Col>
                      <Col xs={2}>
                        <Button variant="secondary" onClick={handleCancel}>
                          Cancel
                        </Button>
                      </Col>
                    </Row>
                  )}
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Col>
      </Row>

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

export default Account;
