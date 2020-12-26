import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import 'react-calendar/dist/Calendar.css';
import reportWebVitals from './reportWebVitals';
import Calendar from 'react-calendar';

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
  <ReactCalendar/>,
  document.querySelector('#root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
