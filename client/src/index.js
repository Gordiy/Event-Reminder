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
		this._eventInfo = this.props.eventInfo;
		
		if(this._eventInfo.data.status === 'not_exist') {
			this.state = {
				hours: 1,
				minutes: 1,
				date: new Date(props.date),
				label: '',
				text: ''
			};
		} else {
			this.state = {
				hours: this._eventInfo.data.hours,
				minutes: this._eventInfo.data.minutes,
				date: new Date(props.date),
				label: this._eventInfo.data.label,
				text: this._eventInfo.data.description
			}
		}
		
		this.base_url = 'http://localhost:8000';
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	sendRequest(date, hours, minutes) {
		var res = request('POST', `${this.base_url}/event-datetime`, {
			json: {
					'date': date,
					'hours': hours,
					'minutes': minutes
			},
		});
		this._eventInfo = JSON.parse(res.getBody('utf8'));
	}

	handleSubmit = (event) => {
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
		console.log("Handle change state", this.state);

		if(this._eventInfo.status === 'exist') {
			this.sendRequest(this.state.date, this.state.hours, this.state.minutes);
			this.setState({
				[event.target.name]: event.target.value,
				text: this._eventInfo.data.description,
				label: this._eventInfo.data.label
			});
		} else {
			this.setState({[event.target.name]: event.target.value})
		}
	}

	render() {
		console.log("render", this.state);
		return (
			<Modal.Dialog>
				<Modal.Header closeButton onClick={this.props.closePopup}>
					<Modal.Title>Create Notification</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<EventForm 
						handleSubmit={this.handleSubmit}
						handleChange={this.handleChange}
						eventInfo={this._eventInfo}
						label={this.state.label}
						text={this.state.text}
						hours={this.state.hours}
						minutes={this.state.minutes}
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
		console.log("send request", this._eventInfo);
	}

	togglePopup(date) {
		this.date = date;
		this.setState({
		  showPopup: !this.state.showPopup
		});

		if(!this.state.showPopup) {
			this.sendRequest(date);
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
