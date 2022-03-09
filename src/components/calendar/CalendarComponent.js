import {React, useState} from 'react';
import Calendar from 'react-calendar';
import './calendar.css';

const CalendarComponent = () => {
    
    const [value, onChange] = useState(new Date());

    const showDate = (value, event) => {
        console.log(value)
    }

    return (
           <Calendar onChange={onChange} value={value} onClickDay={showDate}/> 
    );
};

export default CalendarComponent;