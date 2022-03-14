import React from 'react';
import { useNavigate } from 'react-router-dom';
import EmptyGoals from '../components/goals/EmptyGoals.js'

const Goals = () => {
    const navigate = useNavigate()

    return (
        <div>
            <EmptyGoals/>
        </div>
    );
};

export default Goals;