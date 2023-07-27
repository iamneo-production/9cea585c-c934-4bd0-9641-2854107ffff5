import React from 'react';
import { Col, Container, Nav, Row } from 'react-bootstrap';
import { Link, Route, Routes } from 'react-router-dom';
import QueryList from '../Seller/QueryList';
import YourProperty from '../Seller/YourProperty';
import Account from './Account';
import DeactivateAccount from './DeactivateAccount';

function SellerProfile() {
  return (
    <Container fluid>
      <Row>
        <Col md={3} style={{ minHeight: '80vh', background: '#f8f9fa', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '5px' }}>
          <Nav className="flex-column">
            <Nav.Item>
              <Nav.Link as={Link} to="/SellerProfile/Account" className="nav-link">Account</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/SellerProfile/YourProperty" className="nav-link">Your Property</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/SellerProfile/QueryList" className="nav-link">Query List</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/SellerProfile/DeactivateAccount" className="nav-link">Deactivate Account</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col md={9} style={{ padding: '14px', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '5px' }}>
          <Routes>
            <Route path="/" element={<Account />} />
            <Route path="/Account" element={<Account />} />
            <Route path="/YourProperty" element={<YourProperty />} />
            <Route path="/QueryList" element={<QueryList />} />
            <Route path="/DeactivateAccount" element={<DeactivateAccount />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}

export default SellerProfile;
