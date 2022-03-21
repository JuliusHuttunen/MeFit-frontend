import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DisplayGoals from '../components/goals/DisplayGoals.js';
import EmptyGoals from '../components/goals/EmptyGoals.js'

const Goals = () => {
    const navigate = useNavigate()
    const goals = useSelector((state) => state.utility.profile.goals)

    return (
        <div>
            {/* {goals === null ||  goals.length === 0 ? <EmptyGoals/> : <DisplayGoals></DisplayGoals>} */}
            <EmptyGoals></EmptyGoals>
        </div>
    );
};

export default Goals;