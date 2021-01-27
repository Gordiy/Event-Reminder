import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import {EventForm} from './modules';
import 'react-calendar/dist/Calendar.css';
import reportWebVitals from './reportWebVitals';
import Calendar from 'react-calendar';
import { Modal } from 'react-bootstrap';
const axios = require('axios').default;
// import { Button } from 'react-bootstrap';


class Popup extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			hours: 1,
			minutes: 1,
			date: new Date(props.date),
			label: '',
			text: ''
		};
		this.base_url = 'http://localhost:8000';
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit = (event) => {
		console.log("Submit state", this.state)
		event.preventDefault();
		fetch(`${this.base_url}/add-event`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(this.state),
		})
		.then((res) => {
			console.log(res.text())
		})
		.then((result) => {
			console.log("result", result)
		})
		.catch((err) => console.log('error'))
	}
		
	handleChange = (event) => {
		this.setState({[event.target.name]: event.target.value});
	}

	render() {
		console.log("state", this.state);
		return (
			<Modal.Dialog>
				<Modal.Header closeButton onClick={this.props.closePopup}>
					<Modal.Title>Create Notification</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<EventForm 
						handleSubmit={this.handleSubmit}
						handleChange={this.handleChange}
					/>
				</Modal.Body>
			</Modal.Dialog>
		);
	}
  }

class EventCalendar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showPopup: false
		  };

		this.togglePopup = this.togglePopup.bind(this);
		this.date = undefined;
	}

	togglePopup(date) {
		this.date = date;
		this.setState({
		  showPopup: !this.state.showPopup
		});
	  }

	render() {
		return(
				<div className='app'>
					<Calendar onClickDay={this.togglePopup} />
					{this.state.showPopup ? 
						<Popup
							text='Close Me'
							closePopup={this.togglePopup.bind(this)}
							date={this.date}
						/>
						: null
					}
				</div>
			)
	}
}

ReactDOM.render(
	<div>
		<EventCalendar />
	</div>,
  document.querySelector('#root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
