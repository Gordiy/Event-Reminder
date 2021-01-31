import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'


class EventForm extends React.Component {
    constructor(props) {
        super(props)
        this._eventInfo = props.eventInfo;
        console.log("form constructor",props)
    }
    
    render() {
        const hours = [];
        for (let index = 1; index <= 24; index++) {
            if(this._eventInfo.status === 'exist' && this._eventInfo.data.hours === index) {
                hours.push(<option value={index} selected>{index}</option>)
            } else {
                hours.push(<option value={index}>{index}</option>)
            }
        }

        const minutes = [];
        for (let index = 1; index <= 60; index++) {
            if(this._eventInfo.status === 'exist' && this._eventInfo.data.minutes === index) {
                minutes.push(<option value={index} selected>{index}</option>)
            } else {
                minutes.push(<option value={index}>{index}</option>)
            }
        }

        console.log("FORM props", this.props)
        return (
            <Form onSubmit={this.props.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Hours</Form.Label>
                    <Form.Control as="select" name="hours" onChange={this.props.handleChange}>
                        {hours}
                    </Form.Control>

                    <Form.Label>Minutes</Form.Label>
                    <Form.Control as="select" name="minutes" onChange={this.props.handleChange}>
                        {minutes}
                    </Form.Control>

                    <Form.Label>Short description</Form.Label>
                    <Form.Control as="input" type="text" name="label" placeholder="Label" defaultValue={this.props.label} onChange={this.props.handleChange}/>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Full description</Form.Label>
                    <Form.Control as="textarea" name="text" rows={3} onChange={this.props.handleChange}>
                        {this.props.text}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Button  type="submit" value="Submit" variant="primary">Save</Button>
                </Form.Group>
            </Form>
        )
    }
}

export default EventForm;