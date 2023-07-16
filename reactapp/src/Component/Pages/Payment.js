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
  const backendImagePath = './Assets/PropertyMedia';
  const backendProfileImagePath = './Assets/ProfileImage';
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:8080/users/id?id=${userId}`);
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
      const orderresponse = await axios.post('http://localhost:8080/purchase/order', null, {
        params: {
          propertyId: property.id,
          userId: userData.id,
          agentId: property.agent.id,
          payableAmount: property.price + property.price * 0.01,
          platformFee: property.price * 0.01
        }
      });

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
            await axios.put(`http://localhost:8080/purchase/order/${id}`, null, {
              params: {
                paymentId: razorpay.razorpayPaymentId,
              }
            });
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

}

export default Payment;