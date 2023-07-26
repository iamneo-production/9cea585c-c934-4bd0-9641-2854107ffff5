import axios from 'axios';
import { useContext, useState } from 'react';
import { Button, Col, Container, Form, Row, Toast, ToastContainer } from 'react-bootstrap';
import { BsCheckCircleFill } from 'react-icons/bs';
import { FiAlertTriangle } from 'react-icons/fi';
import { UserContext } from '../UserProvider';

function Contact() {
  const { userRole } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    subject: '',
    description: '',
    userRole: userRole,
    userId: userRole === 'guest' ? 0 : localStorage.getItem('userId'),
  });
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('success');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('https://8080-dfafaaeeddfbcddcfcdcebdafbeaeaadbdbabf.project.examly.io/Query', formData);

      // Show the success toast
      setShowToast(true);
      setToastType('success');

      // Reset the form fields
      handleReset();
    } catch (error) {

      // Show the error toast
      setShowToast(true);
      setToastType('error');
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phoneNumber: '',
      subject: '',
      description: ''
    });
  };

  const handleToastClose = () => {
    setShowToast(false);
  };

  return (
    <Container fluid className="border-0 shadow rounded-3 my-5 p-3" style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', minHeight: '300px' }}>
      <h2 className="fw-bold mb-2 text-center text-uppercase">CONTACT US</h2>
      <Form className="p-2" onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formBasicPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                placeholder="Enter phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formBasicSubject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                placeholder="Enter subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            placeholder="Enter description"
            rows={6}
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Row className="justify-content-center">
            <Col sm={2} className="text-center">
              <Button type="submit">Submit</Button>
            </Col>
            <Col sm={2} className="text-center">
              <Button variant="secondary" onClick={handleReset}>Reset</Button>
            </Col>
          </Row>
        </Form.Group>
      </Form>
      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={handleToastClose} delay={3000} autohide bg={toastType === 'success' ? 'success' : 'danger'} >
          <Toast.Header closeButton={false} className="text-white bg-transparent">
            {toastType === 'success' ? (
              <BsCheckCircleFill size={24} className="me-2" />
            ) : (
              <FiAlertTriangle size={24} className="me-2" />
            )}
            <strong className="me-auto">{toastType === 'success' ? 'Success' : 'Error'}</strong>
          </Toast.Header>
          <Toast.Body>
            {toastType === 'success' ? (
              'Query Raised.. Will contact you Back Soon'
            ) : (
              'Issue in Raising Query.. Use Other Medium of Contact..'
            )}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

export default Contact;
