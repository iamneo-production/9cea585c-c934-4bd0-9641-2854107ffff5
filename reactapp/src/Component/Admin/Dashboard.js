import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Toast } from 'react-bootstrap';

function Dashboard() {
  const [data, setData] = useState([]);
  const [errorToast, setErrorToast] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://8080-aacbbdbdbffeddcfcdcebdafbeaeaadbdbabf.project.examly.io/Utility/data', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setData(response.data);
      } catch (error) {
        setErrorToast('Error fetching data. Please try again later.');
      }
    };

    fetchData();
  }, []);

  return (
    <Container className="p-sm-1" style={{ marginTop: '20px', marginBottom: '20px' }}>
      <h4 className="font-weight-bold text-center">Welcome to Admin Page</h4>
      <Row style={{ margin: '20px 0' }}>
        <Col>
          <Card className="border-0 shadow rounded-3 p-4 p-sm-5">
            <h4 className="font-weight-bold card-title text-center">Total No. of Active Users</h4>
            <h2 className="text-center font-weight-bold text-success mt-4 mb-4">{data[0]}</h2>
          </Card>
        </Col>
        <Col>
          <Card className="border-0 shadow rounded-3 p-4 p-sm-5">
            <h4 className="font-weight-bold card-title text-center">Total No. of Active Agents</h4>
            <h2 className="text-center font-weight-bold text-success mt-4 mb-4">{data[1]}</h2>
          </Card>
        </Col>
      </Row>
      <Row style={{ margin: '20px 0' }}>
        <Col>
          <Card className="border-0 shadow rounded-3 p-4 p-sm-5">
            <h4 className="font-weight-bold card-title text-center">Total No. of Active Properties</h4>
            <h2 className="text-center font-weight-bold text-success mt-4 mb-4">{data[2]}</h2>
          </Card>
        </Col>
        <Col>
          <Card className="border-0 shadow rounded-3 p-4 p-sm-5">
            <h4 className="font-weight-bold card-title text-center">Total No. of Active Queries</h4>
            <h2 className="text-center font-weight-bold text-success mt-4 mb-4">{data[3]}</h2>
          </Card>
        </Col>
      </Row>

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
    </Container>
  );
}

export default Dashboard;
