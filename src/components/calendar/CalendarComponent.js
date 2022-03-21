import {React, useState} from 'react';
import Calendar from 'short-react-calendar';
import './calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { swapDate } from '../../redux/basketSlice';
import ConvertDate from "./ConvertDate"
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'

const CalendarComponent = (props) => {
    
    const [locale, setLocale] = useState("ISO 8601")
    const [value, onChange] = useState(new Date(useSelector((state) => state.basket.endDate)));
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const showDate = (value) => {
        dispatch(swapDate(value.toISOString()))
    }

    const DisplayWeek = (props) => {
        const oneJan = new Date(props.date.getFullYear(),0,1)
        const numberOfDays = Math.floor((props.date - oneJan) / (24 * 60 * 60 * 1000));
        const week = Math.ceil(( props.date.getDay() + 1 + numberOfDays) / 7);
        return <div>Week {week}</div>
    }

    const today = new Date()

    return (
        <div>
            <div style={{"display":"flex", "flexDirection":"column", "justifyContent":"center", "alignItems":"center"}}>
                <h3><DisplayWeek date={today}></DisplayWeek></h3>
                <Calendar locale={"us-US"} calendarType={locale} showNavigation={false} oneWeekCalendar={true} onChange={onChange} value={value} onClickDay={showDate}/>
            </div>
            <div style={{"padding":"1rem"}}>
                {props.basket ? <h4><ConvertDate date={value} text={"Goal end date:"}/></h4> : 
                <div><h4><ConvertDate date={today} text={"Today is: "}/></h4><h4><ConvertDate date={value} text={"Goal end date:"}/></h4><Button onClick={() => navigate("/goals")}>Set a goal</Button></div>}
                {locale !== "US" ? <Button onClick={() => setLocale("US")}>Swap week starting day</Button> : <Button onClick={() => setLocale("ISO 8601")}>Swap week starting day</Button>}
            </div>
        </div>   
    );
};

export default CalendarComponent;