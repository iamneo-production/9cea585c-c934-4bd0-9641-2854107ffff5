import axios from 'axios';
import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { BsEnvelopeFill, BsFillPersonFill, BsLockFill, BsPhoneFill } from 'react-icons/bs';
import { MdLocationOn } from 'react-icons/md';

function BuyerRegisterForm({ onCloseModal }) {
  const initialState = {
    name: '',
    email: '',
    phone: '',
    password: '',
    address: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [validationErrors, setValidationErrors] = useState({});
  const [userAlreadyExists, setUserAlreadyExists] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    const errors = { ...validationErrors };
    // Validate individual fields
    switch (name) {
      case 'email':
        if (!value) {
          errors.emailError = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errors.emailError = 'Invalid email address.';
        } else {
          delete errors.emailError;
        }
        break;
      case 'password':
        if (!value) {
          errors.passwordError = 'Password is required.';
        } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/.test(value)) {
          errors.passwordError =
            'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one symbol, and one number.';
        } else {
          delete errors.passwordError;
        }
        break;
      case 'phone':
        if (!value) {
          errors.phoneError = 'Phone number is required.';
        } else if (!/^\d{10}$/.test(value)) {
          errors.phoneError = 'Invalid phone number.';
        } else {
          delete errors.phoneError;
        }
        break;
      default:
        break;
    }

    setValidationErrors(errors);
    setUserAlreadyExists(false); // Reset user already exists error
  };

  const handleReset = () => {
    setFormData(initialState);
    setValidationErrors({});
    setUserAlreadyExists(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check for any validation errors before submitting
    if (Object.keys(validationErrors).length !== 0) {
      return;
    }

    try {
      const response = await axios.post('https://8080-dfafaaeeddfbcddcfcdcebdafbeaeaadbdbabf.project.examly.io/users/register', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 201) {
        // Registration successful
        alert('User Registered.');
        onCloseModal();
      } else {
        console.error('Registration failed with status:', response.status);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setUserAlreadyExists(true);
        setFormData(initialState);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>
            <BsFillPersonFill /> Name *
          </Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <BsEnvelopeFill /> Email address *
          </Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleInputChange}
            isInvalid={!!validationErrors.emailError}
            required
          />
          <Form.Control.Feedback type="invalid">{validationErrors.emailError}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <BsPhoneFill /> Phone Number *
          </Form.Label>
          <Form.Control
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            isInvalid={!!validationErrors.phoneError}
            required
          />
          <Form.Control.Feedback type="invalid">{validationErrors.phoneError}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <BsLockFill /> Password *
          </Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            isInvalid={!!validationErrors.passwordError}
            autoComplete="current-password"
            required
          />
          <Form.Control.Feedback type="invalid">{validationErrors.passwordError}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <MdLocationOn /> Address *
          </Form.Label>
          <Form.Control
            as="textarea"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group>
          <Row className="justify-content-center">
            <Col xs={6} className="text-end">
              <Button variant="secondary" type="button" onClick={handleReset}>
                Reset
              </Button>
            </Col>
            <Col xs={6} className="text-start">
              <Button variant="primary" type="submit">
                Sign Up
              </Button>
            </Col>
          </Row>
        </Form.Group>

        {userAlreadyExists && (
          <Form.Group>
            <Row className="justify-content-center">
              <Col xs={12} className="text-center">
                <p className="text-danger">User already registered.</p>
              </Col>
            </Row>
          </Form.Group>
        )}
      </Form>
    </Container>
  );
}

export default BuyerRegisterForm;
