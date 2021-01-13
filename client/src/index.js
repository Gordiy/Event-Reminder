import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css'

import 'react-calendar/dist/Calendar.css';
import reportWebVitals from './reportWebVitals';
import Calendar from 'react-calendar';
// import Popup from 'reactjs-popup';

class Popup extends React.Component {
	render() {
	  return (
		<div className='popup'>
		  <div className='popup_inner'>
			<h1>{this.props.text}</h1>
		  <button onClick={this.props.closePopup}>close me</button>
		  </div>
		</div>
	  );
	}
  }

class EventCalendar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showPopup: false
		  };

		// this.onDayClick = this.onDayClick.bind(this);
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
