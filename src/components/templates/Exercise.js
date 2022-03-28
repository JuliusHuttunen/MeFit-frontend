import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { useDispatch } from "react-redux";
import { addExercise } from "../../redux/basketSlice";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import "../../App.css";

const Exercise = (props) => {
  const dispatch = useDispatch();

  let muscleGroupImage = "";

  try {
    muscleGroupImage =
      "/assets/muscle/" +
      props.exercise.targetMuscleGroup.toLowerCase() +
      ".png";
  } catch (error) {
    console.log(error.message);
  }

  const addItemToBasket = (exercise) => {
    dispatch(addExercise(exercise));
  };

  try {
    return (
      <Accordion key={props.index} className="exerciseAccordion">
        <Accordion.Item key={props.index} eventKey={props.index}>
          <Accordion.Header>
            <h4>
              Exercise: {props.exercise.name}{" "}
              <img
                src={muscleGroupImage}
                width={"30 px"}
                alt="muscle img"
              ></img>
            </h4>
          </Accordion.Header>
          <Accordion.Body>
            <h6>Description: </h6>
            <p>{props.exercise.description}</p>
            <h6>Target muscle group: </h6>
            <p>{props.exercise.targetMuscleGroup}</p>
            <h6>Level: </h6>
            <p>{props.exercise.fitnessLevel}</p>
            <hr />
            {props.basket ? (
              <Row>
                <Button onClick={() => addItemToBasket(props.exercise)}>
                  Add to draft
                </Button>
              </Row>
            ) : (
              <></>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  } catch (error) {
    return <></>;
  }
};

export default Exercise;
