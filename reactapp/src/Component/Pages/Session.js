import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from 'react-bootstrap';
import AdminLogin from '../Admin/AdminLoginForm';
import BuyerLogin from '../Buyer/BuyerLoginForm';
import BuyerRegister from '../Buyer/BuyerRegisterForm';
import SellerLogin from '../Seller/SellerLoginForm';
import SellerRegister from '../Seller/SellerRegisterForm';

function Session({ isModalOpen, handleCancel, userType }) {
  const handleClose = () => {
    handleCancel();
  };

  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    setShowLogin(true);
  }, [isModalOpen]);

  const handleToggleLogin = () => {
    setShowLogin(!showLogin);
  };

  let modalTitle;
  let modalBody;

  if (userType === 'buyer') {
    modalTitle = showLogin ? <h2>Buyer Login</h2> : <h2>Buyer Register</h2>;
    modalBody = showLogin ? <BuyerLogin onCloseModal={handleCancel} /> : <BuyerRegister onCloseModal={handleCancel} />;
  } else if (userType === 'seller') {
    modalTitle = showLogin ? <h2>Seller Login</h2> : <h2>Seller Register</h2>;
    modalBody = showLogin ? <SellerLogin onCloseModal={handleCancel} /> : <SellerRegister onCloseModal={handleCancel} />;
  } else if (userType === 'admin') {
    modalTitle = <h2>Admin Login</h2>;
    modalBody = <AdminLogin onCloseModal={handleCancel} />;
  }

  const showSignUpLink = userType !== 'admin';

  return (
    <Modal
      show={isModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modalBody}
        {showSignUpLink && (
          <>
            <Row className="justify-content-center mt-4">
              <Col xs={12} className="text-center">
                <p className="text-muted">
                  {showLogin ? "Don't have an account?" : "Already have an account?"}
                </p>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col xs={12} className="text-center">
                <Button variant="link" onClick={handleToggleLogin}>
                  {showLogin ? "Sign up" : "Login"}
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Session;
