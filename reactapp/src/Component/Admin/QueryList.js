import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Table, Toast } from 'react-bootstrap';
import { UserContext } from '../UserProvider';

const QueryList = () => {
  const [searchId, setSearchId] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [queries, setQueries] = useState([]);
  const [filteredQueries, setFilteredQueries] = useState([]);
  const [replyTextMap, setReplyTextMap] = useState({});
  const [errorToast, setErrorToast] = useState(null);
  const [successToast, setSuccessToast] = useState(null);
  const { userRole } = useContext(UserContext);

  const fetchAllQueries = async () => {
    try {
      const response = await axios.get('https://8080-aacbbdbdbffeddcfcdcebdafbcfcbaedbffbeeaadbbb.project.examly.io/Query', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setQueries(response.data);
    } catch (error) {
      setErrorToast('Error fetching queries. Please try again later.');
    }
  };

  useEffect(() => {
    fetchAllQueries();
  }, []);

  const postReply = async (queryId) => {
    try {
      const replyText = replyTextMap[queryId] || '';
      await axios.post(`https://8080-aacbbdbdbffeddcfcdcebdafbcfcbaedbffbeeaadbbb.project.examly.io/Query/${queryId}`, `${userRole}: ${replyText}`, {
        headers: {
          'Content-Type': 'text/plain',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setReplyTextMap((prevMap) => ({
        ...prevMap,
        [queryId]: '',
      }));

      // Fetch the updated queries
      fetchAllQueries();
      setSuccessToast('Reply posted successfully.');
    } catch (error) {
      setErrorToast('Error posting reply. Please try again.');
    }
  };

  useEffect(() => {
    const filteredById = queries.filter((query) => query.id.toString() === searchId);
    const filteredByKeyword = queries.filter((query) => {
      const keyword = searchKeyword.toLowerCase();
      return (
        query.name.toLowerCase().includes(keyword) ||
        query.email.toLowerCase().includes(keyword) ||
        query.query.toLowerCase().includes(keyword)
      );
    });

    if (searchId !== '') {
      setFilteredQueries(filteredById);
    } else {
      setFilteredQueries(filteredByKeyword);
    }
  }, [searchId, searchKeyword, queries]);

  const handleReplyChange = (event, queryId) => {
    const { value } = event.target;
    setReplyTextMap((prevMap) => ({
      ...prevMap,
      [queryId]: value,
    }));
  };

  return (
    <Container className="border-0 shadow rounded-3 p-sm-2" style={{ marginTop: '20px', marginBottom: '20px' }}>
      <h4 className="mx-auto font-weight-bold card-title text-center mt-4 mb-3">All Queries</h4>
      <Row className="justify-content-center mb-3">
        <Col xs={12} sm={6} className="mb-3">
          <Form.Label>Search by Query Id:</Form.Label>
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
              <th>ID</th>
              <th>User ID</th>
              <th>Subject</th>
              <th>Description</th>
              <th>Name</th>
              <th>Email</th>
              <th>Replies</th>
            </tr>
          </thead>
          <tbody>
            {filteredQueries.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center">
                  No queries raised
                </td>
              </tr>
            ) : (
              filteredQueries.map((query) => (
                <tr key={query.id}>
                  <td>{query.id}</td>
                  <td>{query.userId}</td>
                  <td>{query.subject}</td>
                  <td>{query.description}</td>
                  <td>{query.name}</td>
                  <td>{query.email}</td>
                  <td>
                    {query.replies && query.replies.length > 0 ? (
                      <ul className="reply-list">
                        {query.replies.map((reply) => (
                        <li key={reply.id}>{reply}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>No replies</p>
                    )}
                    <Form.Group className="mb-0">
                      <Form.Control
                        type="text"
                        value={replyTextMap[query.id] || ''}
                        onChange={(event) => handleReplyChange(event, query.id)}
                        placeholder="Enter a reply"
                      />
                    </Form.Group>
                    <Col className="p-2 fw-bold mb-2 text-center ">
                      <Button variant="primary" onClick={() => postReply(query.id)}>
                        Post Reply
                      </Button>
                    </Col>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
      
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

export default QueryList;
