import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/Utility/data');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container className='p-sm-1' style={{ marginTop: '20px', marginBottom: '20px' }}>
      <h4 className='font-weight-bold text-center'>Welcome to Admin Page</h4>
      <Row style={{ margin: '20px 0' }}>
        <Col>
          <Card className='border-0 shadow rounded-3 p-4 p-sm-5'>
            <h4 className='font-weight-bold card-title text-center'>Total No. of Active Users</h4>
            <h2 className='text-center font-weight-bold text-success mt-4 mb-4'>{data[0]}</h2>
          </Card>
        </Col>
        <Col>
          <Card className='border-0 shadow rounded-3 p-4 p-sm-5'>
            <h4 className='font-weight-bold card-title text-center'>Total No. of Active Agents</h4>
            <h2 className='text-center font-weight-bold text-success mt-4 mb-4'>{data[1]}</h2>
          </Card>
        </Col>
      </Row>
      <Row style={{ margin: '20px 0' }}>
        <Col>
          <Card className='border-0 shadow rounded-3 p-4 p-sm-5'>
            <h4 className='font-weight-bold card-title text-center'>Total No. of Active Properties</h4>
            <h2 className='text-center font-weight-bold text-success mt-4 mb-4'>{data[2]}</h2>
          </Card>
        </Col>
        <Col>
          <Card className='border-0 shadow rounded-3 p-4 p-sm-5'>
            <h4 className='font-weight-bold card-title text-center'>Total No. of Active Queries</h4>
            <h2 className='text-center font-weight-bold text-success mt-4 mb-4'>{data[3]}</h2>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
