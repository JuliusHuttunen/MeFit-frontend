import { React } from 'react';
import CalendarComponent from '../components/calendar/CalendarComponent';
import Container from 'react-bootstrap/Container';
import DisplayGoals from '../components/goals/DisplayGoals';

const Dashboard = () => {

    return (
        <Container className='p-3'>
           <CalendarComponent></CalendarComponent>
           <DisplayGoals></DisplayGoals>
        </Container> 
    );
};

export default Dashboard;