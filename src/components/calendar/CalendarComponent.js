import { React, useState } from 'react';
import Calendar from 'short-react-calendar';
import './calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { swapDate, swapStartDate } from '../../redux/basketSlice';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'
import { getWeek, format, nextSunday, nextMonday } from 'date-fns';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const CalendarComponent = (props) => {

    const today = new Date()
    const locale = useSelector((state) => state.basket.locale)
    const [value, onChange] = useState(useSelector((state) => state.basket.startDate))
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const currentWeek = getWeek(today)
    const formatDay = format(today, "dd.MM.yyyy")
    const endDate = nextMonday(today)
    const endDateUS = nextSunday(today)

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
        <Container>
            <div style={{ "display": "flex", "justifyContent": "space-around", "alignItems": "center" }}>
                {!props.basket ? <><span className='h4'>Week {currentWeek}</span><span className='h4'>Today is {formatDay}</span></> : <></>}
            </div>
            <Calendar locale={"us-US"} calendarType={locale} showNavigation={false} oneWeekCalendar={true} onChange={onChange} value={value} onClickDay={(value, event) => swapStartDay(value)} />
            <Container className="p-3">
                <div style={{ "display": "flex", "justifyContent": "space-around", "alignItems": "center" }}>
                    <Row>
                        <Col>
                            {!props.basket ? <Button className="text-nowrap" onClick={() => navigate("/goals")}>View goals</Button> : <><h6><span className="h6">Goal start date: {reduxStartDate}</span></h6><h6><span className='h6'>Goal end date: {reduxEndDate}</span></h6></>}
                        </Col>
                        <Col>
                            <Button className="text-nowrap" variant="info" onClick={locale !== "US" ? () => swapCalendarTypeToUS() : () => swapCalendarTypeToDefault()}>{locale !== "US" ? "Change locale to US" : "Change locale to Europe"}</Button>
                        </Col>
                    </Row>
                </div>
            </Container>
        </Container>
    );
};

export default CalendarComponent;