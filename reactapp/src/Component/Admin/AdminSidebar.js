import React from 'react';
import { Nav, NavLink } from 'react-bootstrap';
import { FaHome, FaQuestion, FaUser, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <Nav className="flex-column p-3">
      <NavLink as={Link} to="/Dashboard" style={{ color: 'white' }}>
        <FaHome /> Dashboard
      </NavLink>
      <NavLink as={Link} to="/PropertyList" style={{ color: 'white' }}>
        <FaHome /> Property Details
      </NavLink>
      <NavLink as={Link} to="/AddProperty" style={{ color: 'white' }}>
        <FaHome /> Add Property
      </NavLink>
      <NavLink as={Link} to="/AgentList" style={{ color: 'white' }}>
        <FaUser /> Agent Details
      </NavLink>
      <NavLink as={Link} to="/UserList" style={{ color: 'white' }}>
        <FaUsers /> User Details
      </NavLink>
      <NavLink as={Link} to="/QueryList" style={{ color: 'white' }}>
        <FaQuestion /> Queries Raised
      </NavLink>
    </Nav>
  );
};

export default AdminSidebar;