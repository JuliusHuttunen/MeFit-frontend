import React, { useState } from 'react';
import Container from 'react-bootstrap/Container'
import Accordion from 'react-bootstrap/Accordion';
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useSelector } from 'react-redux';
import ConvertDate from '../calendar/ConvertDate';

const DisplayGoals = () => {

    const profile = useSelector((state) => state.utility.profile)

    const goalRatio = () => {
        let achieved = 0
        for(let goal of profile.goals){
            if(goal.achieved){
                achieved++
            }
        }
        return profile.goals.length / achieved
    }
    const [progress, setProgress] = useState() 

    return (
        <div>
        <Container>
        {profile.goals.map((goal, index) => {
            return(
                <Accordion>
                    <Accordion.Item>
                        <AccordionHeader></AccordionHeader>
                        <Accordion.Body>
                    {goal.achieved ? <div key={index}>{goal.goalId} <ConvertDate text={"Goal end date: "} date={new Date(goal.endDate)}></ConvertDate></div> : <div></div>}
                    
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            )
        })}
        </Container>
        <h6>Your goal progress this week</h6>
        <ProgressBar style={{"height":"2em","width":"70%"}}now={progress} label={`${progress}%`}/>
        </div>
        
    );
};

export default DisplayGoals;