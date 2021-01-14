import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import {EventForm} from './modules';
import 'react-calendar/dist/Calendar.css';
import reportWebVitals from './reportWebVitals';
import Calendar from 'react-calendar';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';


class Popup extends React.Component {
	render() {
	  return (
		<Modal.Dialog>
			<Modal.Header closeButton>
				<Modal.Title>Modal title</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<EventForm></EventForm>
			</Modal.Body>

			<Modal.Footer>
				<Button onClick={this.props.closePopup} variant="secondary">Close</Button>
				<Button variant="primary">Save changes</Button>
			</Modal.Footer>
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
	}

	togglePopup(date) {
		console.log(date)
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
