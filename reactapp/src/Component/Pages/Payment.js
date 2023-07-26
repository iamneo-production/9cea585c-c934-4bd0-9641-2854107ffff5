import axios from "axios";
import React, { useEffect, useState } from "react";
import { Accordion, Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import { BsFillEnvelopeFill, BsFillPersonFill, BsFillPhoneFill } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';

function Payment() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    address: '',
  });
  const [activeAccordion, setActiveAccordion] = useState('0');
  const location = useLocation();
  const { property } = location.state;
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        console.log(localStorage.getItem('token'));
        const response = await axios.get(`https://8080-aacbbdbdbffeddcfcdcebdafbcfcbaedbffbeeaadbbb.project.examly.io/users/id?id=${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleContinue = (eventKey) => {
    setActiveAccordion(eventKey);
  };


  const handlePayment = async (event) => {
    try {
      event.preventDefault();
      // Create a new Razorpay order on the server
      const orderresponse = await axios.post(
        'https://8080-aacbbdbdbffeddcfcdcebdafbcfcbaedbffbeeaadbbb.project.examly.io/purchase/order',
        null,
        {
          params: {
            propertyId: property.id,
            userId: userData.id,
            agentId: property.agent.id,
            payableAmount: property.price + property.price * 0.01,
            platformFee: property.price * 0.01
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );


      // Load the Razorpay script dynamically
      const loadScript = (src) => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => {
            resolve();
          };
          document.body.appendChild(script);
        });
      };
      console.log(orderresponse.data);
      const id = orderresponse.data.id;
      console.log(id);
      await loadScript("https://checkout.razorpay.com/v1/checkout.js");

      // Initialize the Razorpay payment object
      const options = {
        key: "rzp_test_dSbVWIe83NdQgw",
        amount: (property.price * 0.01),
        currency: "INR",
        name: "RETEAM32 - Real Estate Management System",
        description: "Test Wallet Transaction",
        image: "http://localhost:3000/logo192.png",
        order_id: orderresponse.data.orderid,
        handler: async function (response) {
          const razorpay = {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          }
          console.log(razorpay);
          try {
            await axios.put(
              `https://8080-aacbbdbdbffeddcfcdcebdafbcfcbaedbffbeeaadbbb.project.examly.io/purchase/order/${id}`,
              null,
              {
                params: {
                  paymentId: razorpay.razorpayPaymentId,
                },
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              }
            );
            console.log("Order updated successfully");
            navigate("/Home");
          } catch (error) {
            console.error("Error updating order:", error);
          }
        },
        prefill: {
          name: userData.name,
          email: userData.email,
          contact: userData.phone,
        },

      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
    }
  };


  return (
    <Container fluid>
      <Row>
        <Col lg={8}>
          <Accordion activeKey={activeAccordion} onSelect={handleContinue}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Your Details</Accordion.Header>
              <Accordion.Body>
                <div>
                  <Row className="align-items-center">
                    <Col xs={1}><BsFillPersonFill /></Col>
                    <Col>{userData.name}</Col>
                  </Row>
                  <hr />
                  <Row className="align-items-center">
                    <Col xs={1}><BsFillEnvelopeFill /></Col>
                    <Col>{userData.email}</Col>
                  </Row>
                  <hr />
                  <Row className="align-items-center">
                    <Col xs={1}><BsFillPhoneFill /></Col>
                    <Col>{userData.phone}</Col>
                  </Row>
                  <hr />
                  <Row className="align-items-center">
                    <Col xs={1}><BsFillEnvelopeFill /></Col>
                    <Col>{userData.address}</Col>
                  </Row>
                  <Col className="d-flex justify-content-end mt-3">
                    <Button variant="primary" onClick={() => handleContinue('1')}>
                      Continue
                    </Button>
                  </Col>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Agent Details</Accordion.Header>
              <Accordion.Body>
                <div>
                  <Row className="align-items-center">
                    <Col xs={3}>
                      <Image
                        src={`${property.agent.profileImageUrl}`}
                        alt="Agent Profile"
                        fluid
                        roundedCircle
                      />
                    </Col>
                    <Col>
                      <Row className="align-items-center">
                        <Col xs={1}><BsFillPersonFill /></Col>
                        <Col>{property.agent.name}</Col>
                      </Row>
                      <hr />
                      <Row className="align-items-center">
                        <Col xs={1}><BsFillEnvelopeFill /></Col>
                        <Col>{property.agent.email}</Col>
                      </Row>
                      <hr />
                      <Row className="align-items-center">
                        <Col xs={1}><BsFillPhoneFill /></Col>
                        <Col>{property.agent.phone}</Col>
                      </Row>
                    </Col>
                  </Row>
                  <Col className="d-flex justify-content-end">
                    <Button variant="primary" onClick={() => handleContinue('2')}>
                      Continue
                    </Button>
                  </Col>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Property Details</Accordion.Header>
              <Accordion.Body>
                <div>
                  <Row className="align-items-center">
                    <Col xs={6}>
                      <Image
                        src={`${property.imageUrls[0]}`}
                        alt="Property Image"
                        fluid
                      />
                    </Col>
                    <Col>
                      <h5>{property.title}</h5>
                      <Row>
                        <Col>{property.address}</Col>
                      </Row>
                      <Row>
                        <Col>{property.price}</Col>
                      </Row>
                      <Col className="d-flex justify-content-end mt-3">
                        <Button variant="primary" onClick={() => handleContinue('3')}>
                          Continue
                        </Button>
                      </Col>
                    </Col>
                  </Row>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
        <Col lg={4}>
          <Card>
            <Card.Body>
              <Card.Title>
                Price Details
              </Card.Title>
              <hr />
              <Row className="align-items-center">
                <Col xs={6}><strong>Property Price</strong></Col>
                <Col xs={6}>{property.price}</Col>
              </Row>
              <hr />
              <Row className="align-items-center">
                <Col xs={6}><strong>Platform fee</strong></Col>
                <Col xs={6}>{property.price * 1 / 100}</Col>
              </Row>
              <hr />
              <Row className="align-items-center">
                <Col xs={6}><strong>Total Payable</strong></Col>
                <Col xs={6}>
                  {property.price + (property.price * 1 / 100)}
                </Col>
              </Row>
            </Card.Body>
            <Card.Body className="d-flex justify-content-end">
              <Button variant="primary" onClick={handlePayment}>
                Pay Now
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Payment;
