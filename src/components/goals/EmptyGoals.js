import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import ProgramsList from '../programviews/ProgramsList'
import WorkoutsList from '../programviews/WorkoutsList'
import ExercisesList from '../programviews/ExercisesList'
import { useDispatch, useSelector } from 'react-redux'
import { del, delExercise, delProgram } from '../../redux/basketSlice'
import Button from 'react-bootstrap/Button'
import CalendarComponent from '../calendar/CalendarComponent'
import { addGoal } from "../../redux/basketSlice"
import { fetchProfile } from "../../redux/profileSlice"
import format from 'date-fns/format'
import Modal from "react-bootstrap/Modal"

function EmptyGoals() {

    const basket = useSelector((state) => state.basket.workouts)
    const currentProgram = useSelector((state) => state.basket.program)
    const goal = useSelector((state) => state.basket)
    const exercises = useSelector((state) => state.basket.exercises)
    const dispatch = useDispatch()
    const endDate = format(useSelector((state) => state.basket.endDate), "dd.MM.yyyy")
    const startDate = format(useSelector((state) => state.basket.startDate), "dd.MM.yyyy")
    const [showModal, setShowModal] = useState(false)
    
    const handleClose = () => setShowModal(false)
    const handleOpen = () => setShowModal(true)

    const confirmationModal = () => {
        return(
        <>
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm goal</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="primary" onClick={setGoal}>Set goal</Button>
            </Modal.Footer>
        </Modal>
        </>)
    }


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

    const setGoal = async() => {
        await dispatch(addGoal(goal)).unwrap()
        await dispatch(fetchProfile()).unwrap()
        handleClose()
    }

    return (
        <Container className='w-70 p-3'>
            {confirmationModal()}
            <Row className="m-5">
                <Col>
                <div className='goalbasketcontainer'>
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
                    </div>
                </Col>
                <Col>
                    <div className='goalbasketcontainer'>
                        <h2 style={{"padding": "10px", "alignSelf":"flex-start"}}>Your goal draft</h2>
                        <h4 style={{"textAlign":"center"}}>{startDate} - {endDate}</h4>
                        <div className='goalbasketwrapper'>
                            <h5 style={{"fontStyle":"italic", "padding":"10px"}}>Current program: {currentProgram === null ? <>none</> : currentProgram.name} </h5>
                            <Button style={{"marginBottom":"10px"}} className="btn btn-warning" onClick={() => dispatch(delProgram())}>Revert</Button>
                        </div>
                        <div className='goalbasketwrapper'>
                            <h4 style={{"alignSelf":"flex-start"}}>Workouts</h4>
                            <ul className='goalbasket'>
                                {basket.length === 0 ? <li style={{"width": "30em", "fontStyle":"italic", "textAlign":"center"}}>Workouts empty</li> : basketMap}
                            </ul>
                        </div>
                        <div className='goalbasketwrapper'>
                            <h4 style={{"alignSelf":"flex-start"}}>Exercises</h4>
                            <ul className='goalbasket'>
                                {exercises.length === 0 ? <li style={{"width": "30em", "fontStyle":"italic", "textAlign":"center"}}>Exercises empty</li> : exerciseMap}
                            </ul>
                        </div>
                        <Button className='btn btn-success' onClick={() => handleOpen()}>Set goal</Button>             
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default EmptyGoals;