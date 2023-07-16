import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Modal, Table } from 'react-bootstrap';

const PurchaseHistory = () => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [purchaseData, setPurchaseData] = useState([]);

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:8080/purchase/history?userId=${userId}`);
        setPurchaseData(response.data);
      } catch (error) {
        console.error('Error fetching purchase history:', error);
      }
    };

    fetchPurchaseHistory();
  }, []);

  const handleShowDetails = (record) => {
    setSelectedPurchase(record);
    setShowDetailsModal(true);
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
            {purchaseData.map((record) => (
              <tr key={record.id}>
                <td>{record.razorpayPaymentId}</td>
                <td>{record.agent.name}</td>
                <td>{record.property.title}</td>
                <td>{record.createdAt}</td>
                <td>
                  <Button variant="primary" onClick={() => handleShowDetails(record)}>
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {selectedPurchase && (
          <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Purchase Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                <strong>Purchase ID:</strong> {selectedPurchase.razorpayPaymentId}
              </p>
              <p>
                <strong>Agent Name:</strong> {selectedPurchase.agent.name}
              </p>
              <p>
                <strong>Property Name:</strong> {selectedPurchase.property.title}
              </p>
              <p>
                <strong>Purchase Price:</strong> {selectedPurchase.payableAmount}
              </p>
            </Modal.Body>
          </Modal>
        )}
      </div>
    </Container>
  );
};

export default PurchaseHistory;
