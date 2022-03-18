import React from 'react';
import { useSelector } from 'react-redux';
import ConvertDate from '../calendar/ConvertDate';

const DisplayGoals = () => {

    const profile = useSelector((state) => state.utility.profile)

    return (
        profile.goals.map((goal, index) => {
            return(
            <div key={index}>{goal.goalId} <ConvertDate date={new Date(goal.endDate)}></ConvertDate> {goal.achieved} {goal.workouts.toString()}</div>
            )
        })
    );
};

export default DisplayGoals;