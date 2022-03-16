import {React} from 'react';
import CalendarComponent from '../components/calendar/CalendarComponent';
import Container from 'react-bootstrap/Container';

const Dashboard = () => {
    return (
        <Container className='w-70 p-3'>
           <CalendarComponent></CalendarComponent>
        </Container>
    );
};

export default Dashboard;