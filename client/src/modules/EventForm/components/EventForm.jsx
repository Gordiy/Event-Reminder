import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'


class EventForm extends React.Component {
    constructor(props) {
        super(props)

        this._eventInfo = props.eventInfo;
    }

    render() {
        const hours = [];
        for (let index = 1; index <= 24; index++) {
            hours.push(<option value={index}>{index}</option>)
            if(this._eventInfo.status === 'exist' && this._eventInfo.data.hours === index) {
                hours.push(<option value={index} selected>{index}</option>)
            } else {
                hours.push(<option value={index}>{index}</option>)
            }
        }

        const minutes = [];
        for (let index = 1; index <= 60; index++) {
            minutes.push(<option value={index}>{index}</option>)
            if(this._eventInfo.status === 'exist' && this._eventInfo.data.minutes === index) {
                minutes.push(<option value={index} selected>{index}</option>)
            } else {
                minutes.push(<option value={index}>{index}</option>)
            }
        }

        let label = '';
        let text = '';
        if(this._eventInfo.status === 'exist') {
            label = this._eventInfo.data.label;
            text = this._eventInfo.data.description;
        }

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

                    <Form.Label>Notification Label</Form.Label>
                    <Form.Control type="text" name="label" placeholder="Label" onChange={this.props.handleChange} value={label}/>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Notification Text</Form.Label>
                    <Form.Control as="textarea" name="text" rows={3} onChange={this.props.handleChange} value={text}/>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Button  type="submit" value="Submit" variant="primary">Save</Button>
                </Form.Group>
            </Form>
        )
    }
}

export default EventForm;