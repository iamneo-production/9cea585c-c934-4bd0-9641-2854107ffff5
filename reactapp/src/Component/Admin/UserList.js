import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Modal, Row, Table, Toast } from 'react-bootstrap';

const UserList = () => {
  const [searchId, setSearchId] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [errorToast, setErrorToast] = useState(null);
  const [successToast, setSuccessToast] = useState(null);

  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal = (userId) => {
    const uservalue = users.find((user) => user.id === userId);
    setSelectedUser(uservalue);
    setShowModal(true);
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      try {
        await axios.delete(`https://8080-afaadedbcdddcfcdcebdafbeaeaadbdbabf.project.examly.io/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        setFilteredUsers((prevFilteredUsers) => prevFilteredUsers.filter((user) => user.id !== userId));
        setSuccessToast(`User with ID ${userId} deleted successfully.`);
      } catch (error) {
        setErrorToast('User is Associated With Property, User Cant Be deleted');
      }
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://8080-afaadedbcdddcfcdcebdafbeaeaadbdbabf.project.examly.io/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const usersData = response.data;
        setUsers(usersData);
      } catch (error) {
        setErrorToast('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filterUsers = () => {
      const filteredById = users.filter((user) => user.id.toString() === searchId);
      const filteredByKeyword = users.filter((user) => {
        const keyword = searchKeyword.toLowerCase();
        return (
          user.name.toLowerCase().includes(keyword) ||
          user.email.toLowerCase().includes(keyword) ||
          user.phone.includes(keyword) ||
          user.address.toLowerCase().includes(keyword)
        );
      });

      if (searchId !== '') {
        setFilteredUsers(filteredById);
      } else {
        setFilteredUsers(filteredByKeyword);
      }
    };

    filterUsers();
  }, [searchId, searchKeyword, users]);

  return (
    <Container className="border-0 shadow rounded-3 p-sm-2" style={{ marginTop: '20px', marginBottom: '20px' }}>
      <h4 className="mx-auto font-weight-bold card-title text-center mt-4 mb-3">All User Details</h4>
      <Row className="justify-content-center mb-3">
        <Col xs={12} sm={6} className="mb-3">
          <Form.Label>Search by User Id:</Form.Label>
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
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                  <td>
                    <Button variant="info" onClick={() => handleOpenModal(user.id)}>
                      View
                    </Button>{' '}
                    <Button variant="danger" onClick={() => handleDelete(user.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              <p>ID: {selectedUser.id}</p>
              <p>Name: {selectedUser.name}</p>
              <p>Email: {selectedUser.email}</p>
              <p>Phone: {selectedUser.phone}</p>
              <p>Address: {selectedUser.address}</p>
            </div>
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
};

export default UserList;
