import React, { useState } from "react";
import { Modal, Nav } from 'react-bootstrap';
import Login from '../Component/Login';
import Register from '../Component/Register';

function Session() {
  const [showLogin, setShowLogin] = useState(true);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleRegisterClick = () => {
    setShowLogin(false);
  };

  return (
    <div className="modal show" style={{ display: 'block', position: 'initial' }}>
      <Modal.Dialog show={true} backdrop="static" keyboard={false} centered>
        <Modal.Header>
          <Nav variant="pills">
            <Nav.Item>
              <Nav.Link onClick={handleLoginClick} active={showLogin}>Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={handleRegisterClick} active={!showLogin}>Register</Nav.Link>
            </Nav.Item>
          </Nav>
        </Modal.Header>

        <Modal.Body>
          {showLogin ? <Login /> : <Register />}
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

export default Session;
