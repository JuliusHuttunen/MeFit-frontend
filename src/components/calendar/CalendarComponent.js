import {React, useState} from 'react';
import Calendar from 'short-react-calendar';
import './calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { swapDate, swapStartDate } from '../../redux/basketSlice';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'
import { getWeek, format, nextSunday, nextSaturday } from 'date-fns';

const CalendarComponent = (props) => {
    
    const today = new Date()
    const locale = useSelector((state) => state.basket.locale)
    const [value, onChange] = useState(useSelector((state) => state.basket.startDate))
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const currentWeek = getWeek(today)
    const formatDay = format(today, "dd.MM.yyyy")
    const endDate = nextSunday(today)
    const endDateUS = nextSaturday(today)

    const reduxEndDate = format(useSelector((state) => state.basket.endDate), "dd.MM.yyyy")
    const reduxStartDate = format(useSelector((state) => state.basket.startDate), "dd.MM.yyyy")

    const swapCalendarTypeToUS = () => {
        dispatch(swapDate([endDateUS, "US"]))
    }

    const swapCalendarTypeToDefault = () => {
        dispatch(swapDate([endDate, "ISO 8601"]))
    }

    const swapStartDay = (value) => {
        dispatch(swapStartDate(value))
    }

    return (
        <div>
            <div style={{"display":"flex", "flexDirection":"column", "justifyContent":"center", "alignItems":"center"}}>
                <div style={{"display":"flex", "width":"70%", "justifyContent":"space-around", "alignItems":"center"}}>
                    <h3>Week {currentWeek}</h3>
                    {locale !== "US" ? <Button style={{"margin":"10px"}} onClick={() => swapCalendarTypeToUS()}>Swap week starting day</Button> : <Button style={{"margin":"10px"}} onClick={() => swapCalendarTypeToDefault()}>Swap week starting day</Button>}
                </div>
                <Calendar locale={"us-US"} calendarType={locale} showNavigation={false} oneWeekCalendar={true} onChange={onChange} value={value} onClickDay={(value, event) => swapStartDay(value)}/>
            </div>
            <div style={{"padding":"1rem"}}>
                {!props.basket ? <div><h4>Today is: {formatDay}</h4><h4>Active date: {reduxStartDate}</h4><Button onClick={() => navigate("/goals")}>Set a goal starting from this date</Button></div> : <div><h4>Goal start date: {reduxStartDate}</h4><h4>Goal end date: {reduxEndDate}</h4></div>}
            </div>
        </div>   
    );
};

export default CalendarComponent;