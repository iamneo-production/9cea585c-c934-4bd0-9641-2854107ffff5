import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { BsFillPersonFill, BsLockFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserProvider';

function BuyerLoginForm({ onCloseModal }) {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: '' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/users/login', formData);
      const userId = response.data.id;

      // Store the token in localStorage
      localStorage.setItem('userId', userId);

      // Set user role to 'buyer'
      setUser('buyer');

      console.log(userId);
      onCloseModal();
      navigate('/Home'); // Redirect to the home page or the desired route after successful login
    } catch (error) {
      // Handle login error
      console.error(error);
      setError('Invalid email or password'); // Set the error message for authentication failure
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>
          <BsFillPersonFill /> Email address *
        </Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleInputChange}
          isInvalid={!!validationErrors.email}
          required
        />
        {validationErrors.email && (
          <Form.Control.Feedback type="invalid">
            <AiOutlineExclamationCircle /> {validationErrors.email}
          </Form.Control.Feedback>
        )}
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>
          <BsLockFill /> Password *
        </Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          isInvalid={!!validationErrors.password}
          required
        />
        {validationErrors.password && (
          <Form.Control.Feedback type="invalid">
            <AiOutlineExclamationCircle /> {validationErrors.password}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Form.Group>
        <Row className="justify-content-center">
          <Col xs={12} className="text-center">
            <Button type="submit">Sign In</Button>
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
}

export default BuyerLoginForm;
