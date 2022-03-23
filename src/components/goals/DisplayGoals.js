import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container'
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useSelector } from 'react-redux';
import { differenceInDays } from 'date-fns';
import Goal from '../templates/Goal';

const DisplayGoals = (props) => {

    //Initialize basic variables
    const [progress, setProgress] = useState()
    const [goalsMap, setGoalsMap] = useState(<>Empty</>)
    const [historyMap, setHistoryMap] = useState(<>Empty</>)
    const [otherMap, setOtherMap] = useState(<>Empty</>)

    const profile = useSelector((state) => state.profile)

    useEffect(() => {
        //Calculate progress bar value
        const goalRatio = () => {
            let achieved = 0
            let weekGoalAmount = 0
            if (profile.goals === undefined || profile.goals === null || profile.goals.length === 0) return 0
            for (let goal of profile.goals) {
                const difference = differenceInDays(new Date(goal.endDate), new Date())
                if (goal.achieved && difference < 7) {
                    achieved++
                }
                if (difference < 7) {
                    weekGoalAmount++
                }
            }
            return (achieved / weekGoalAmount * 100).toFixed(1)
        }
        //Set goals function => goalsMap
        setGoalsMap(goals())
        setHistoryMap(history())
        setOtherMap(other())
        //Update progress bar
        setProgress(goalRatio())
    }, [profile])

    //Goal map function
    const goals = () => {
        //Initial value
        let profileGoals = <></>
        //Goal number init
        let counter = 0
        //When goals are not null/empty:
        if (!!profile.goals) {
            profileGoals =
                profile.goals.map((goal, index) => {
                    //Difference in days
                    const difference = differenceInDays(new Date(goal.endDate), new Date())
                    //Only print in dashboard and if the goal is on this week
                    if (difference < 7 && !goal.achieved) {
                        counter++
                        return (
                           <Goal key={index} goal={goal} counter={counter} index={index} difference={difference}></Goal>
                        )
                    }
                    else if (goal.achieved) {
                        counter ++
                        return(
                            <Goal achieved={true} key={index} goal={goal} counter={counter} index={index} difference={difference}></Goal>
                        )
                    }
                })
        }
        return profileGoals
    }

    //Goal map function
    const history = () => {
        //Initial value
        let goals = <></>
        //When goals are not null/empty:
        if (!!profile.goals) {
            goals =
                profile.goals.map((goal, index) => {
                    //Difference in days
                    const difference = differenceInDays(new Date(goal.endDate), new Date())
                    //Only print in dashboard and if the goal is on this week
                    if (difference < 0 || goal.achieved) {
                        return (
                            <Goal achieved={true} key={index} goal={goal} index={index} difference={difference} history={true}></Goal>
                        )
                    }
                })
        }
        return goals
    }

    //Goal map function
    const other = () => {
        //Initial value
        let goals = <></>
        //Goal number init
        let counter = 0
        //When goals are not null/empty:
        if (!!profile.goals) {
            goals =
                profile.goals.map((goal, index) => {
                    //Difference in days
                    const difference = differenceInDays(new Date(goal.endDate), new Date())
                    //Only print in dashboard and if the goal is on this week
                    if (difference >= 7) {
                        counter++
                        return (
                            <Goal key={index} goal={goal} counter={counter} index={index} difference={difference}></Goal>
                        )
                    }
                })
        }
        return goals
    }

    return (
        <Container className='pt-3'>
            {progress === "100.0" ? <h3>You have completed all your goals! Congratulations!</h3> : <h3></h3>}
            <h5>Your goal progress this week</h5>
            <ProgressBar variant="success" style={{ "height": "2em", "width": "100%", "fontSize": "1.7em", "marginBottom": "1em" }} now={progress} label={`${progress}%`} />
            <Container className='p-3'>
                <h3>This week's goals</h3><hr style={{ margin: "0", padding: "0" }} />
                <div style={{ "paddingTop": "1em" }} className='accordiongrid'>
                    {goalsMap}
                </div>
            </Container>
            {props.enlarge ? <>
                <Container className='p-3'>
                    <h3>Other goals</h3><hr style={{ margin: "0", padding: "0" }} />
                    <div style={{ "paddingTop": "1em" }} className='accordiongrid'>
                        {otherMap}</div></Container><Container className='p-3'><h3>History</h3><hr style={{ margin: "0", padding: "0" }} />
                    <div style={{ "paddingTop": "1em" }} className='accordiongrid'>
                        {historyMap}
                    </div>
                </Container></> : <></>}
        </Container>
    );
};

export default DisplayGoals;