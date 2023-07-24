import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Alert, Button, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserProvider';

const DeactivateAccount = () => {
  const [alertVisible, setAlertVisible] = useState(false);
  const { clearUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const handleDeactivate = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.delete(`http://localhost:8080/agents/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response.data);
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
    <>
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
    </>
  );
};

export default DeactivateAccount;
