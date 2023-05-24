import {Button,Form,Container} from 'react-bootstrap';

function Registerform() {
    return (
        <Container>
        <Form>
            <Form.Group className="mb-3" >
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name" />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="@gmail.com" />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="number" />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Alternate Phone Number</Form.Label>
                <Form.Control type="number" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formFile">
                <Form.Label>Profile Image</Form.Label>
                <Form.Control type="file" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Submit
            </Button>

        </Form>
        </Container>
    );
}

export default Registerform;