import React, { useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Table, Button, Form, Row, Col, Container, Toast } from 'react-bootstrap';
import { UserContext } from '../UserProvider';

const QueryList = () => {
  const [queries, setQueries] = useState([]);
  const [replyTextMap, setReplyTextMap] = useState({});
  const [errorToast, setErrorToast] = useState(null);
  const [successToast, setSuccessToast] = useState(null);

  const { userRole } = useContext(UserContext);
  const userId = localStorage.getItem('userId');

  const fetchQueries = useCallback(async () => {
    try {
      if (userId && userRole) {
        const response = await axios.get(`https://8080-dcdddecdddcfcdcebdafbeaeaadbdbabf.project.examly.io/Query/${userId}/${userRole}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = response.data;
        setQueries(data);
      }
    } catch (error) {
      setErrorToast('Error fetching queries. Please try again later.');
    }
  }, [userId, userRole]);

  useEffect(() => {
    fetchQueries();
  }, [fetchQueries]);

  const handleReplyChange = (event, queryId) => {
    const { value } = event.target;
    setReplyTextMap((prevMap) => ({
      ...prevMap,
      [queryId]: value,
    }));
  };

  const postReply = async (queryId) => {
    try {
      const replyText = replyTextMap[queryId] || '';
      await axios.post(`https://8080-dcdddecdddcfcdcebdafbeaeaadbdbabf.project.examly.io/Query/${queryId}`, `${userRole}: ${replyText}`, {
        headers: {
          'Content-Type': 'text/plain',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setReplyTextMap((prevMap) => ({
        ...prevMap,
        [queryId]: '',
      }));

      fetchQueries();
      setSuccessToast('Reply posted successfully.');
    } catch (error) {
      setErrorToast('Error posting reply. Please try again.');
    }
  };

  return (
    <Container fluid>
      <h4 className="mx-auto font-weight-bold card-title text-center mt-4 mb-3">Your Query</h4>
      <Row className="mb-3">
        <Col>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Subject</th>
                <th>Description</th>
                <th>Replies</th>
              </tr>
            </thead>
            <tbody>
              {queries.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center">
                    No queries raised
                  </td>
                </tr>
              ) : (
                queries.map((query) => (
                  <tr key={query.id}>
                    <td>{query.id}</td>
                    <td>{query.subject}</td>
                    <td>{query.description}</td>
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
                          required
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
        </Col>
      </Row>

      {errorToast && (
        <Toast
          show={true}
          onClose={() => setErrorToast(null)}
          delay={5000}
          autohide
          style={{ position: 'fixed', top: 20, right: 20 }}
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
          style={{ position: 'fixed', top: 20, right: 20 }}
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
