import React from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { BsBuildings, BsChatText, BsEnvelopeAt, BsFillHSquareFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

function HelpCenter() {
    const handleRedirect = () => {
        const url = `mailto:${'saivarunreddynagilla0208@gmail.com'}`;
        window.open(url);

    };
    return (
        <Container fluid className="border-0 shadow rounded-3 my-5 p-sm-5" style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', minHeight: '300px' }}>
            <Row>
                <h4 className='font-weight-bold card-title text-center'><BsBuildings /></h4>
                <h6 className='font-weight-bold card-title text-center mb-5'>Questions not answered yet? We are here to help!</h6>
                <Button as={Link} to="/Faq" className='btn-info form-floating mb-3'>
                    <BsFillHSquareFill />
                    <h5>FAQ</h5>
                    <h6>Got questions? We've got answers</h6>
                </Button>
                <Button as={Link} to="/Contact" className='btn-info form-floating mb-3'>
                    <BsEnvelopeAt />
                    <h5>RAISE A QUERY</h5>
                    <h6>Reply within 2-3 business days</h6>
                </Button>
                <Button className='btn-info form-floating mb-3' onClick={handleRedirect}>
                    <BsChatText />
                    <h5>EMAIL US</h5>
                    <h6>Reply within 2-3 business days</h6>
                </Button>
            </Row>
        </Container>
    );
}

export default HelpCenter;