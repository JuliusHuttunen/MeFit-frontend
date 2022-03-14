import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import ProgramsList from '../programviews/ProgramsList';
import WorkoutsList from '../programviews/WorkoutsList';
import { useDispatch, useSelector } from 'react-redux';
import { del } from '../../redux/basketSlice';
import Button from 'react-bootstrap/Button';

function EmptyGoals() {

    const basket = useSelector((state) => state.basket.items)
    
    const dispatch = useDispatch()

    const basketMap = basket.map((item, index) => {
        return(
            <li key={index}><h6>{item.name}</h6><Button className="btn btn-danger" onClick={() => dispatch(del(index))}>Delete</Button></li>
        )
    })

    return (
        <Container>
            <Row className="m-5">
                <Col>
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
                    </div>
                </Col>
                <Col>
                <div style={{"display":"flex", "alignItems":"center", "justifyContent":"center", "flexDirection":"column"}}>
                    <h2>Your basket</h2>
                        <ul className='goalbasket'>
                            {basketMap}
                        </ul>
                </div>
                </Col>
            </Row>
        </Container>

        
    );
}

export default EmptyGoals;