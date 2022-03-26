import { React } from 'react';
import CalendarComponent from '../components/calendar/CalendarComponent';
import Container from 'react-bootstrap/Container';
import DisplayGoals from '../components/goals/DisplayGoals';

const Dashboard = () => {

    return (
        <Container className='p-3'>
            <h2 style={{ textAlign: "center" }}>Dashboard</h2>
            <hr />
            <CalendarComponent></CalendarComponent>
            <DisplayGoals></DisplayGoals>
        </Container>
    );
};

export default Dashboard;