import React from 'react';
import DisplayGoals from '../components/goals/DisplayGoals.js';
import EmptyGoals from '../components/goals/EmptyGoals.js'

const Goals = () => {

    return (
        <div>
            {/* {goals === null ||  goals.length === 0 ? <EmptyGoals/> : <DisplayGoals></DisplayGoals>} */}
            <EmptyGoals></EmptyGoals>
        </div>
    );
};

export default Goals;