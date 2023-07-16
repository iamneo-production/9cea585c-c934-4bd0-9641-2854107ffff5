import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';

const AgentList = () => {
  const [searchId, setSearchId] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [properties, setProperties] = useState([]);
  const backendProfileImagePath = './Assets/ProfileImage';

  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal = async (agentId) => {
    const agent = agents.find((agent) => agent.id === agentId);
    setSelectedAgent(agent);

    try {
      const response = await axios.get(`http://localhost:8080/agents/properties/${agentId}`);
      const propertiesData = response.data;
      setProperties(propertiesData);
      setShowModal(true);
    } catch (error) {
      console.error(`Failed to fetch properties for agent with ID ${agentId}:`, error);
    }
  };

  const handleDelete = async (agentId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this agent?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/agents/${agentId}`);
        setAgents(agents.filter((agent) => agent.id !== agentId));
        setFilteredAgents(filteredAgents.filter((agent) => agent.id !== agentId));
        console.log(`Agent with ID ${agentId} deleted successfully.`);
      } catch (error) {
        window.confirm('Agent is Associated With Property, Agent Cant Be deleted');
        console.error(`Failed to delete agent with ID ${agentId}:`, error);
      }
    }
  };

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/agents');
        const agentsData = response.data;
        setAgents(agentsData);
      } catch (error) {
        console.error('Failed to fetch agents:', error);
      }
    };

    fetchAgents();
  }, []);

  useEffect(() => {
    const filterAgents = () => {
      const filteredById = agents.filter((agent) => agent.id.toString() === searchId);
      const filteredByKeyword = agents.filter((agent) => {
        const keyword = searchKeyword.toLowerCase();
        return (
          agent.name.toLowerCase().includes(keyword) ||
          agent.email.toLowerCase().includes(keyword) ||
          agent.phone.includes(keyword) ||
          agent.address.toLowerCase().includes(keyword)
        );
      });

      if (searchId !== '') {
        setFilteredAgents(filteredById);
      } else {
        setFilteredAgents(filteredByKeyword);
      }
    };

    filterAgents();
  }, [searchId, searchKeyword, agents]);

  return (
    <Container className="border-0 shadow rounded-3 p-sm-2" style={{ marginTop: '20px', marginBottom: '20px' }}>
      <h4 className="mx-auto font-weight-bold card-title text-center mt-4 mb-3">All Agent Details</h4>
      <Row className="justify-content-center mb-3">
        <Col xs={12} sm={6} className="mb-3">
          <Form.Label>Search by Agent Id:</Form.Label>
          <Form.Control type="number" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
        </Col>
        <Col xs={12} sm={6} className="mb-3">
          <Form.Label>Search by Keyword:</Form.Label>
          <Form.Control type="text" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
        </Col>
      </Row>
      <div style={{ maxHeight: '350px', overflow: 'auto' }}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAgents.length > 0 ? (
              filteredAgents.map((agent) => (
                <tr key={agent.id}>
                  <td>{agent.id}</td>
                  <td>{agent.name}</td>
                  <td>{agent.email}</td>
                  <td>{agent.phone}</td>
                  <td>{agent.address}</td>
                  <td>
                    <Button variant="info" onClick={() => handleOpenModal(agent.id)}>
                      View
                    </Button>{' '}
                    <Button variant="danger" onClick={() => handleDelete(agent.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center">
                  No agents found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Agent Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAgent && (
            <Row className="align-items-center">
              <Col xs={4} className="text-center">
                <img
                  src={`${backendProfileImagePath}/${selectedAgent.profileImageUrl}`}
                  alt="Agent Profile"
                  style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                />
              </Col>
              <Col xs={8}>
                <p>ID: {selectedAgent.id}</p>
                <p>Name: {selectedAgent.name}</p>
                <p>Email: {selectedAgent.email}</p>
                <p>Phone: {selectedAgent.phone}</p>
                <p>Address: {selectedAgent.address}</p>
                <h6>Properties:</h6>
                {properties.length > 0 ? (
                  <ul>
                    {properties.map((property) => (
                      <li key={property.id}>{property.title}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No properties found.</p>
                )}

              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
};

export default AgentList;