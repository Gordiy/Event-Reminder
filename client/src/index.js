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
			showPopup: true
		  };

		// this.onDayClick = this.onDayClick.bind(this);
		this.togglePopup = this.togglePopup.bind(this);
	}

	togglePopup() {
		this.setState({
		  showPopup: !this.state.showPopup
		});
	  }

	onDayClick(e) {
		console.log(e)
		this.togglePopup.bind(this);
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

const Modal = () => (
  <Popup
	open={true}
    // trigger={<button className="button"> Open Modal </button>}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> Modal Title </div>
        <div className="content">
          {' '}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
          Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
          delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
          <br />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
          commodi beatae optio voluptatum sed eius cumque, delectus saepe repudiandae
          explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?
        </div>
        <div className="actions">
          <Popup
            trigger={<button className="button"> Trigger </button>}
            position="top center"
            nested
          >
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
              magni omnis delectus nemo, maxime molestiae dolorem numquam
              mollitia, voluptate ea, accusamus excepturi deleniti ratione
              sapiente! Laudantium, aperiam doloribus. Odit, aut.
            </span>
          </Popup>
          <button
            className="button"
            onClick={() => {
              console.log('modal closed ');
              close();
            }}
          >
            close modal
          </button>
        </div>
      </div>
    )}
  </Popup>
);


const ReactCalendar = () => {
	const [date, setDate] = useState(new Date());

	const onDayClick = () => {
		{console.log("Hello")}
	}

	return (
		<div>
			<Calendar onClickDay={onDayClick} />
			{console.log(date)}
		</div>
	)
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
