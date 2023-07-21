import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Modal, Table, Toast } from 'react-bootstrap';

const PurchaseHistory = () => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [purchaseData, setPurchaseData] = useState([]);
  const [errorToast, setErrorToast] = useState(false);

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:8080/purchase/history?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setPurchaseData(response.data);
      } catch (error) {
        console.error('Error fetching purchase history:', error);
        setErrorToast(true);
      }
    };

    fetchPurchaseHistory();
  }, []);

  const handleShowDetails = (record) => {
    setSelectedPurchase(record);
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedPurchase(null);
  };

  return (
    <Container>
      <h4 className="mx-auto font-weight-bold card-title text-center mt-4 mb-3">Purchase History</h4>

      <div style={{ overflowX: 'auto' }}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Purchase ID</th>
              <th>Agent Name</th>
              <th>Property Name</th>
              <th>Purchase Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {purchaseData.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center">
                  No purchase history found.
                </td>
              </tr>
            ) : (
              purchaseData.map((record) => (
                <tr key={record.id}>
                  <td>{record.razorpayPaymentId || 'N/A'}</td>
                  <td>{record.agent?.name || 'N/A'}</td>
                  <td>{record.property?.title || 'N/A'}</td>
                  <td>{record.createdAt || 'N/A'}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleShowDetails(record)}>
                      Details
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        {selectedPurchase && (
          <Modal show={showDetailsModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Purchase Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                <strong>Purchase ID:</strong> {selectedPurchase.razorpayPaymentId || 'N/A'}
              </p>
              <p>
                <strong>Agent Name:</strong> {selectedPurchase.agent?.name || 'N/A'}
              </p>
              <p>
                <strong>Property Name:</strong> {selectedPurchase.property?.title || 'N/A'}
              </p>
              <p>
                <strong>Purchase Price:</strong> {selectedPurchase.payableAmount || 'N/A'}
              </p>
            </Modal.Body>
          </Modal>
        )}

        {/* Error Toast */}
        <Toast
          show={errorToast}
          onClose={() => setErrorToast(false)}
          delay={5000}
          autohide
          style={{ position: 'fixed', top: 20, right: 20, minWidth: '300px' }}
          bg="danger"
          variant="light"
        >
          <Toast.Header closeButton={false}>
            <strong className="mr-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>Something went wrong. Please try again later.</Toast.Body>
        </Toast>

      </div>
    </Container>
  );
};

export default PurchaseHistory;
