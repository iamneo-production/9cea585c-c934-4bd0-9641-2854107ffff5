import { React, useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import Login from '../Component/Login';
import Register from '../Component/Register';

function Session() {
    const [showLogin, setShowLogin] = useState(true); // set the initial state of showLogin to true

    const handleLoginClick = () => {
        setShowLogin(true); // set showLogin to true to render the Login component
    }

    const handleRegisterClick = () => {
        setShowLogin(false); // set showLogin to false to render the Register component
    }

    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}>
            <Modal.Dialog show={true}
                backdrop="static"
                keyboard={false}
                centered>
                <Modal.Header>
                    <Button variant="primary" onClick={handleLoginClick}>Login</Button>
                    <Button variant="primary" onClick={handleRegisterClick}>Register</Button>
                </Modal.Header>

                <Modal.Body>
                    {showLogin ? <Login /> : <Register />}
                </Modal.Body>
            </Modal.Dialog>
        </div>
    );
}
export default Session;
