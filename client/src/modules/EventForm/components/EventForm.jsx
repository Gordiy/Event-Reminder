import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from '@bit/react-bootstrap.react-bootstrap.form';
import Button from '@bit/react-bootstrap.react-bootstrap.button';
import ReactBootstrapStyle from '@bit/react-bootstrap.react-bootstrap.internal.style-links';


class EventForm extends React.Component {
    constructor() {
        super()
    }
    render() {
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    }
}

export default EventForm;