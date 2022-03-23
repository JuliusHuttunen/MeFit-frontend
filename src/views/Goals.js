import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import { useSelector } from 'react-redux';
import DisplayGoals from '../components/goals/DisplayGoals.js';
import EmptyGoals from '../components/goals/EmptyGoals.js'

const Goals = () => {

    const goals = useSelector((state) => state.profile.goals)
    const [showGenerator, setShowGenerator] = useState(false)

    return (
        <Container className='p-3'>
            {goals.length !== 0 ? !showGenerator ? <Button variant="secondary" onClick={() => setShowGenerator(true)}>Set more goals</Button> : <Button variant="warning" onClick={() => setShowGenerator(false)}>Hide generator</Button> : <></>}
            {goals.length !== 0 && !showGenerator ?
                <>
                    <DisplayGoals enlarge={true}></DisplayGoals></> :
                <EmptyGoals></EmptyGoals>}
        </Container>
    );
};

export default Goals;