import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'


class EventForm extends React.Component {
    constructor() {
        super()
    }

    render() {
        const hours = [];
        for (let index = 1; index <= 24; index++) {
            hours.push(<option>{index}</option>)
        }

        const minutes = [];
        for (let index = 1; index <= 60; index++) {
            minutes.push(<option>{index}</option>)
        }
        
        return (
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Hours</Form.Label>
                    <Form.Control as="select">
                        {hours}
                    </Form.Control>

                    <Form.Label>Minutes</Form.Label>
                    <Form.Control as="select">
                        {minutes}
                    </Form.Control>

                    <Form.Label>Notification Label</Form.Label>
                    <Form.Control type="text" placeholder="Label" />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Notification Text</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>
        )
    }
}

export default EventForm;