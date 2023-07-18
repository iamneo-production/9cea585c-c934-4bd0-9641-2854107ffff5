import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { BsFillPersonFill, BsLockFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserProvider';

function AdminLoginForm({ onCloseModal }) {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/agents/login', formData);
      //Handle successful login
      const userId = response.data.id;

      // Store the token in localStorage
      localStorage.setItem('userId', userId);
      console.log(userId);
      const { email } = formData;
      // Check if the entered email and password match the admin credentials
      if (email === 'admin@gmail.com') {
        // Handle successful login
        // Set user role to 'admin'
        setUser('admin');

        onCloseModal();
        navigate('/Dashboard');
      } // Redirect to the home page or the desired route after successful login
    } catch {
      // Handle login error
      setError('Invalid email or password');
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
          required
        />
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
          required
        />
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

export default AdminLoginForm;
