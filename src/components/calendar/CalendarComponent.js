import {React, useState} from 'react';
import Calendar from 'short-react-calendar';
import './calendar.css';
import { useDispatch } from 'react-redux';
import { swapDate } from '../../redux/basketSlice';

const CalendarComponent = () => {
    
    const [value, onChange] = useState(new Date());
    const dispatch = useDispatch()

    const showDate = (value, event) => {
        console.log(value)
        dispatch(swapDate(value.toISOString()))
    }

    const ConvertDate = (props) => {
        const day = props.date.getDate()
        const month = props.date.getMonth() + 1
        const year = props.date.getFullYear()
        const pre = props.text
        return (<div>{pre} {day}.{month}.{year}</div>)
    }

    const DisplayWeek = (props) => {
        const oneJan = new Date(props.date.getFullYear(),0,1)
        const numberOfDays = Math.floor((props.date - oneJan) / (24 * 60 * 60 * 1000));
        const week = Math.ceil(( props.date.getDay() + 1 + numberOfDays) / 7);
        return (<div>Week {week}</div>)
    }

    const today = new Date()

    return (
        <div>
        <div style={{"display":"flex", "flexDirection":"column", "justifyContent":"center", "alignItems":"center"}}>
            <h3><DisplayWeek date={today}></DisplayWeek></h3>
            <Calendar showNavigation={false} oneWeekCalendar={true} onChange={onChange} value={value} onClickDay={showDate}/>
        </div>
        <div>
            {/* <h4><ConvertDate date={today} text={""}/></h4> */}
            <h4><ConvertDate date={value} text={"Goal end date:"}/></h4>
        </div>
        </div>
           
    );
};

export default CalendarComponent;