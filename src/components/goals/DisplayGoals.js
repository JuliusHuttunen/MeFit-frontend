import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container'
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useSelector } from 'react-redux';
import { differenceInDays } from 'date-fns';
import Goal from '../templates/Goal';

const DisplayGoals = (props) => {

    const [progress, setProgress] = useState()
    const [goalsMap, setGoalsMap] = useState(<>Empty</>)
    const [historyMap, setHistoryMap] = useState(<>Empty</>)

    const profile = useSelector((state) => state.profile)

    useEffect(() => {
        //Calculate progress bar value
        const goalRatio = () => {
            let achieved = 0
            let weekGoalAmount = 0
            if (profile.goals === undefined || profile.goals === null || profile.goals.length === 0) return 0
            for (let goal of profile.goals) {
                const difference = differenceInDays(new Date(goal.endDate), new Date())
                if (goal.achieved && difference < 7 && difference >= 0) {
                    achieved++
                }
                if (difference < 7 && difference >= 0) {
                    weekGoalAmount++
                }
            }
            if (achieved === 0 && weekGoalAmount === 0) return 0
            return (achieved / weekGoalAmount * 100).toFixed(1)
        }
        setGoalsMap(goals())
        setHistoryMap(history())
        setProgress(goalRatio())
    }, [profile])

    //Goal map function
    const goals = () => {
        let profileGoals = <></>
        let counter = 0
        if (!!profile.goals) {
            profileGoals =
                profile.goals.map((goal, index) => {
                    const difference = differenceInDays(new Date(goal.endDate), new Date())
                    if (difference < 7 && difference >= 0 && !goal.achieved) {
                        counter++
                        return (
                            <Goal key={index} goal={goal} counter={counter} index={index} difference={difference}></Goal>
                        )
                    }
                    else if (difference < 7 && difference >= 0 && goal.achieved) {
                        counter++
                        return (
                            <Goal achieved={true} key={index} goal={goal} counter={counter} index={index} difference={difference}></Goal>
                        )
                    }
                })
        }
        return profileGoals
    }

    //Goal map function
    const history = () => {
        let goals = <></>
        if (!!profile.goals) {
            goals =
                profile.goals.map((goal, index) => {
                    const difference = differenceInDays(new Date(goal.endDate), new Date())
                    if (difference < 0) {
                        return (
                            <Goal achieved={true} key={index} goal={goal} index={index} difference={difference} history={true}></Goal>
                        )
                    }
                })
        }
        return goals
    }

    return (
        <Container>
            {progress === "100.0" ? <h3>All goals completed for the week! Congratulations!</h3> : <></>}
            <h5>Goal progress this week</h5>
            <ProgressBar variant={progress === "100.0" ? "success" : "primary"} className="progressBar" now={progress} label={`${progress}%`} />
            <Container className='p-2'>
                <h3>This week's goals</h3>
                <hr />
                <div className='accordiongrid'>
                    {goalsMap}
                </div>
            </Container>
            {props.enlarge ?
                <Container className='p-3'>
                    <h3>History</h3>
                    <hr />
                    <div className='accordiongrid'>
                        {historyMap}
                    </div>
                </Container> : <></>}
        </Container>
    );
};

export default DisplayGoals;