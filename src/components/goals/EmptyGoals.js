import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import ProgramsList from '../programviews/ProgramsList';
import WorkoutsList from '../programviews/WorkoutsList';
import ExercisesList from '../programviews/ExercisesList';
import { useDispatch, useSelector } from 'react-redux';
import { del, delExercise, delProgram } from '../../redux/basketSlice';
import Button from 'react-bootstrap/Button';
import CalendarComponent from '../calendar/CalendarComponent';
import { addGoal } from "../../redux/basketSlice"
import { fetchProfile } from '../../redux/utilitySlice';
import DisplayGoals from './DisplayGoals';

function EmptyGoals() {

    const basket = useSelector((state) => state.basket.workouts)
    const currentProgram = useSelector((state) => state.basket.program)
    const goal = useSelector((state) => state.basket)
    const exercises = useSelector((state) => state.basket.exercises)
    
    const dispatch = useDispatch()

    const basketMap = basket.map((item, index) => {
        return(
            <li key={index}><h6>{item.name}</h6><Button className="btn btn-danger" onClick={() => dispatch(del(index))}>Delete</Button></li>
        )
    })

    const exerciseMap = exercises.map((item, index) => {
        return(
            <li key={index}><h6>{item.name}</h6><Button className="btn btn-danger" onClick={() => dispatch(delExercise(index))}>Delete</Button></li>
        )
    })

    const setGoal = () => {
        dispatch(addGoal(goal))
        dispatch(fetchProfile())
    }

    return (
        <Container>
            <Row className="m-5">
                <Col>
                <h2 style={{"padding": "10px"}}>Create a goal</h2>
                <CalendarComponent basket={true}></CalendarComponent>
                <div className='accordiongrid'>
                        <Accordion>
                            <Accordion.Item eventKey='0'>
                                <Accordion.Header><h4>Programs</h4></Accordion.Header>
                                <Accordion.Body><ProgramsList basket={true}/></Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <Accordion>
                            <Accordion.Item eventKey='1'>
                                <Accordion.Header><h4>Workouts</h4></Accordion.Header>
                                <Accordion.Body><WorkoutsList basket={true}/></Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <Accordion>
                            <Accordion.Item eventKey='2'>
                                <Accordion.Header><h4>Exercises</h4></Accordion.Header>
                                <Accordion.Body><ExercisesList basket={true}/></Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </Col>
                <Col>
                <div style={{"display":"flex", "alignItems":"center", "justifyContent":"center", "flexDirection":"column"}}>
                    <h2 style={{"padding": "10px"}}>Your goal draft</h2>
                    <h5 style={{"fontStyle":"italic"}}>Current program: {currentProgram === null ? <>none</> : currentProgram.name} </h5>
                    <Button style={{"marginBottom":"10px"}} className="btn btn-warning" onClick={() => dispatch(delProgram())}>Revert</Button>
                        <h4>Workouts</h4>
                        <ul className='goalbasket'>
                            {basket.length === 0 ? <li style={{"width": "30em", "fontStyle":"italic", "textAlign":"center"}}>Workouts empty</li> : basketMap}
                        </ul>
                        <h4>Exercises</h4>
                        <ul className='goalbasket'>
                            {exercises.length === 0 ? <li style={{"width": "30em", "fontStyle":"italic", "textAlign":"center"}}>Exercises empty</li> : exerciseMap}
                        </ul>
                        
                        <Button className='btn btn-success' onClick={() => setGoal()}>Set goal</Button>
                        <DisplayGoals></DisplayGoals>                
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default EmptyGoals;