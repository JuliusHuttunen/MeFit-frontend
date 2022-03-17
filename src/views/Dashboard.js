import { React, useEffect } from 'react';
import CalendarComponent from '../components/calendar/CalendarComponent';
import Container from 'react-bootstrap/Container';
import { setProfile } from '../redux/utilitySlice';
import { useDispatch } from 'react-redux';
import { getUserProfile } from "../components/API/Connection"

const Dashboard = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
        const[error, userProfile] = await getUserProfile()
        dispatch(setProfile(userProfile))
        }
        fetchData()
    },[])

    return (
        <Container className='w-70 p-3'>
           <CalendarComponent></CalendarComponent>
        </Container>
    );
};

export default Dashboard;