import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Alert, Button, ButtonGroup, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserProvider';

function DeactivateAccount() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleDeactivate = async () => {
    try {
      const userId = localStorage.getItem('userId');
      await axios.delete(`https://8080-eddfcabaeaccfeddcfcdcebdafbeaeaadbdbabf.project.examly.io/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Account deactivated successfully');
      clearUser(); // Clear user data from local storage
      navigate('/Home');
    } catch (error) {
      setErrorMessage('Unable to deactivate account. You are associated with a property.');
    }
    setAlertVisible(false);
  };

  const handleCancel = () => {
    setAlertVisible(false);
  };

  const showAlert = () => {
    setAlertVisible(true);
  };

  return (
    <Container>
      <Button variant="primary" onClick={showAlert}>
        Deactivate Account
      </Button>

      {alertVisible && (
        <Alert
          show={alertVisible}
          onClose={handleCancel}
          variant="warning"
          dismissible
        >
          <Alert.Heading>Confirm Deactivation</Alert.Heading>
          <p>Are you sure you want to deactivate your account? This action cannot be undone.</p>
          <ButtonGroup>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button variant="danger" onClick={handleDeactivate}>Deactivate</Button>
          </ButtonGroup>
        </Alert>
      )}

      {errorMessage && (
        <Alert variant="danger">
          {errorMessage}
        </Alert>
      )}
    </Container>
  );
};

export default DeactivateAccount;
