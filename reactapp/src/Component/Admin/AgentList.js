import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Modal, Row, Table, Toast } from 'react-bootstrap';

function AgentList () {
  const [searchId, setSearchId] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [properties, setProperties] = useState([]);
  const [errorToast, setErrorToast] = useState(null);
  const [successToast, setSuccessToast] = useState(null);

  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal = async (agentId) => {
    const agentvalue = agents.find((agent) => agent.id === agentId);
    setSelectedAgent(agentvalue);

    try {
      const response = await axios.get(`https://8080-feaaeedcbbebeeddcfcdcebdafbcfcbaedbffbeeaadbbb.project.examly.io/agents/properties/${agentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const propertiesData = response.data;
      setProperties(propertiesData);
      setShowModal(true);
    } catch (error) {
      setErrorToast('Failed to fetch properties for the selected agent.');
    }
  };

  const handleDelete = async (agentId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this agent?');
    if (confirmDelete) {
      try {
        await axios.delete(`https://8080-feaaeedcbbebeeddcfcdcebdafbcfcbaedbffbeeaadbbb.project.examly.io/agents/${agentId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setAgents(agents.filter((agent) => agent.id !== agentId));
        setFilteredAgents(filteredAgents.filter((agent) => agent.id !== agentId));
        setSuccessToast('Agent deleted successfully.');
      } catch (error) {
        setErrorToast('Failed to delete the agent. The agent might be associated with properties.');
      }
    }
  };

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get('https://8080-feaaeedcbbebeeddcfcdcebdafbcfcbaedbffbeeaadbbb.project.examly.io/agents', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const agentsData = response.data;
        setAgents(agentsData);
      } catch (error) {
        setErrorToast('Failed to fetch agents.');
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
                  src={`${selectedAgent.profileImageUrl}`}
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

      {errorToast && (
        <Toast
          show={true}
          onClose={() => setErrorToast(null)}
          delay={5000}
          autohide
          style={{ position: 'absolute', top: 20, right: 20 }}
        >
          <Toast.Header>
            <strong className="mr-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>{errorToast}</Toast.Body>
        </Toast>
      )}

      {successToast && (
        <Toast
          show={true}
          onClose={() => setSuccessToast(null)}
          delay={5000}
          autohide
          style={{ position: 'absolute', top: 20, right: 20 }}
        >
          <Toast.Header>
            <strong className="mr-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>{successToast}</Toast.Body>
        </Toast>
      )}
    </Container>
  );
}

export default AgentList;