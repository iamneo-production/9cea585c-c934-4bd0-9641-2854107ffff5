import axios from 'axios';
import jwt_decode from 'jwt-decode';
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
  const [loginError, setLoginError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: '' });
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    return password.trim() !== '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isEmailValid(formData.email) || !isPasswordValid(formData.password)) {
      setValidationErrors({
        email: isEmailValid(formData.email) ? '' : 'Invalid email address',
        password: isPasswordValid(formData.password) ? '' : 'Password cannot be empty'
      });
      return;
    }

    try {
      const response = await axios.post('https://8080-facbdebeebddcfcdcebdafbcfcbaedbffbeeaadbbb.project.examly.io/users/login', formData);

      // Handle successful login
      const decodedToken = jwt_decode(response.data);
      // Store the token in localStorage
      localStorage.setItem('token', response.data);
      localStorage.setItem('userId', decodedToken.id);

      // Set user role to 'buyer'
      setUser(decodedToken.role);

      onCloseModal();
      navigate('/Home'); // Redirect to the home page or the desired route after successful login
    } catch (error) {
      // Handle login error
      setLoginError('Invalid email or password'); // Set the error message for authentication failure
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

      {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
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
