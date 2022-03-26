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
import Card from "react-bootstrap/Card"

function EmptyGoals() {

    const basket = useSelector((state) => state.basket.workouts)
    const currentProgram = useSelector((state) => state.basket.program)
    const goal = useSelector((state) => state.basket)
    const exercises = useSelector((state) => state.basket.exercises)
    const dispatch = useDispatch()
    const endDate = format(useSelector((state) => state.basket.endDate), "dd.MM.yyyy")
    const startDate = format(useSelector((state) => state.basket.startDate), "dd.MM.yyyy")
    const [showModal, setShowModal] = useState(false)
    const userFitnessLevel = useSelector((state) => state.profile.fitnessLevel)

    let overFitnessLevel = false

    const handleClose = () => setShowModal(false)
    const handleOpen = () => setShowModal(true)

    const confirmationModal = () => {
        let programOverFitnessLevel = false
        try {
            if (calculateProgramLevel(currentProgram) > userFitnessLevel) {
                programOverFitnessLevel = true
            }
        }
        catch (error) {
            programOverFitnessLevel = false
        }
        return (
            <>
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm goal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{overFitnessLevel || programOverFitnessLevel ? <h6>Your goal contains items that may be too demanding for your fitness level. Do you want to proceed?</h6> : <h5>Are you sure?</h5>}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                        <Button variant="success" onClick={setGoal}>Set goal</Button>
                    </Modal.Footer>
                </Modal>
            </>)
    }

    const calculateProgramLevel = (program) => {
        let counter = 0
        let totalFitnessLevel = 0
        for (let workout of program.workouts) {
            for (let set of workout.sets) {
                counter++
                totalFitnessLevel += parseInt(set.exercise.fitnessLevel)
            }
        }
        const fitnessLevel = totalFitnessLevel / counter
        return fitnessLevel
    }


    const basketMap = basket.map((item, index) => {
        let totalFitnessLevel = 0
        let counter = 0
        for (let set of item.sets) {
            counter++
            totalFitnessLevel += parseInt(set.exercise.fitnessLevel)
        }
        const fitnessLevel = totalFitnessLevel / counter
        if (fitnessLevel > userFitnessLevel) {
            overFitnessLevel = true
        }
        return (
            <Card style={{ width: '18rem' }} key={index}>
                <Card.Body>
                    <Card.Title>{item.name}{userFitnessLevel}</Card.Title>
                    {fitnessLevel < userFitnessLevel ? <Card.Subtitle className="mb-2 text-muted">Workout</Card.Subtitle> : <Card.Subtitle className="mb-2 text-muted">Workout over your level</Card.Subtitle>}
                    <Card.Text>Level: {fitnessLevel}</Card.Text>
                    <Row style={{ padding: "10px" }}>
                        <Button className="btn btn-danger" onClick={() => dispatch(del(index))}>Delete</Button>
                    </Row>
                </Card.Body>
            </Card>
        )
    })

    const exerciseMap = exercises.map((item, index) => {
        if (item.fitnessLevel > userFitnessLevel) {
            overFitnessLevel = true
        }
        return (
            <Card style={{ width: '18rem' }} key={index}>
                <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    {item.fitnessLevel < userFitnessLevel ? <Card.Subtitle className="mb-2 text-muted">Exercise</Card.Subtitle> : <Card.Subtitle className="mb-2 text-muted">Exercise over your level</Card.Subtitle>}
                    <Row style={{ padding: "10px" }}>
                        <Button className="btn btn-danger" onClick={() => dispatch(delExercise(index))}>Delete</Button>
                    </Row>
                </Card.Body>
            </Card>
        )
    })

    const setGoal = async () => {
        await dispatch(addGoal(goal)).unwrap()
        await dispatch(fetchProfile()).unwrap()
        handleClose()
    }

    return (
        <Container fluid className='p-3'>
            {confirmationModal()}
            <Row className="m-5">
                <Col>
                    <Container className='p-3' style={{ border: "1px solid lightgray", borderRadius: "10px", backgroundColor: "white" }}>
                        <h3>Create a goal</h3>
                        <hr />
                        <h4>Pick a start date:</h4>
                        <CalendarComponent basket={true}></CalendarComponent>
                        <hr />
                        <h4>Add a program to your goal:</h4>
                        <Accordion>
                            <Accordion.Item eventKey='0'>
                                <Accordion.Header><h4>All programs</h4></Accordion.Header>
                                <Accordion.Body><ProgramsList basket={true} /></Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <hr />
                        <h4>Pick workouts:</h4>
                        <Accordion>
                            <Accordion.Item eventKey='1'>
                                <Accordion.Header><h4>All workouts</h4></Accordion.Header>
                                <Accordion.Body><WorkoutsList basket={true} /></Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <hr />
                        <h4>Create a custom workout:</h4>
                        <Accordion>
                            <Accordion.Item eventKey='2'>
                                <Accordion.Header><h4>All exercises</h4></Accordion.Header>
                                <Accordion.Body><ExercisesList basket={true} /></Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <hr />
                    </Container>
                </Col>
                <Col>
                    <Container className='p-3' style={{ border: "1px solid lightgray", borderRadius: "10px", backgroundColor: "white" }}>
                        <h3>Your goal draft</h3>
                        <hr />
                        <span className='h5'>Goal time period: {startDate} - {endDate}</span>
                        <hr />
                        <h4>Program: {currentProgram === null ? <>none</> : currentProgram.name + " (Level " + calculateProgramLevel(currentProgram) + ")"} </h4>
                        <Row style={{ padding: "10px" }}>
                            <Button className="btn btn-danger" onClick={() => dispatch(delProgram())}>Clear program</Button>
                        </Row>
                        <hr />
                        <h4>Workouts</h4>
                        <div className="accordiongrid2">
                            {basket.length === 0 ? <>Empty</> : basketMap}
                        </div>
                        <hr />
                        <h4>Custom workout</h4>
                        <div className="accordiongrid2">
                            {exercises.length === 0 ? <>Empty</> : exerciseMap}
                        </div>
                        <hr />
                        <h4>Confirm</h4>
                        <Row style={{ padding: "10px" }}>
                            <Button className='btn btn-success' onClick={() => handleOpen()}>Set goal</Button>
                        </Row>
                        <hr />
                    </Container>
                </Col>
            </Row>
        </Container >
    );
}

export default EmptyGoals;