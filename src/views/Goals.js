import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
import DisplayGoals from '../components/goals/DisplayGoals.js';
import EmptyGoals from '../components/goals/EmptyGoals.js'

const Goals = () => {

    const goals = useSelector((state) => state.profile.goals)
    const [showGenerator, setShowGenerator] = useState(false)

    return (
        <Container className='p-3'>
                <DisplayGoals enlarge={true}></DisplayGoals>
                <EmptyGoals></EmptyGoals>
        </Container>
    );
};

export default Goals;