import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import {EventForm} from './modules';
import 'react-calendar/dist/Calendar.css';
import reportWebVitals from './reportWebVitals';
import Calendar from 'react-calendar';
import { Modal } from 'react-bootstrap';
const request = require('sync-request');
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
		console.log('pop up', this.props.eventInfo);
		return (
			<Modal.Dialog>
				<Modal.Header closeButton onClick={this.props.closePopup}>
					<Modal.Title>Create Notification</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<EventForm 
						handleSubmit={this.handleSubmit}
						handleChange={this.handleChange}
						eventInfo={this.props.eventInfo}
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
		this.base_url = 'http://localhost:8000';
		this._eventInfo = undefined;
		this.date = undefined;
	}

	sendRequest(date) {
		var res = request('POST', `${this.base_url}/event-date`, {
			json: {'date': date},
		});
		this._eventInfo = JSON.parse(res.getBody('utf8'));
	}

	togglePopup(date) {
		this.date = date;
		this.setState({
		  showPopup: !this.state.showPopup
		});

		if(!this.state.showPopup) {
			this.sendRequest(date)
			console.log(this._eventInfo)
		}
	  }

	render() {
		return(
				<div className='app'>
					<Calendar onClickDay={this.togglePopup} />
					{this.state.showPopup ? 
						<Popup
							closePopup={this.togglePopup.bind(this)}
							date={this.date}
							eventInfo={this._eventInfo}
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
