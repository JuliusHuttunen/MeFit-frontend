import React from "react";
import Form from "react-bootstrap/Form";

const EditExerciseForm = () => {
  const exercise = useSelector((state) => state.profile);

  let [Exercise, setExercise] = useState({
    name: exercise.name,
    description: exercise.description,
    targetMuscleGroup: exercise.targetMuscleGroup,
    fitnessLevel: exercise.fitnessLevel,
  });

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setExercise((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {};

  return (
    <Form>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Exercise name</Form.Label>
        <Form.Control
          {...register("name")}
          value={Exercise.name}
          type="text"
          onChange={handleChange}
          placeholder="Name for exercise"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          {...register("description")}
          value={Exercise.description}
          type="text"
          onChange={handleChange}
          placeholder="Description of exercise"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="muscleGroup">
        <Form.Label>Target muscle group</Form.Label>
        <Form.Select
          {...register("targetMuscleGroup")}
          value={Exercise.targetMuscleGroup}
          onChange={handleChange}
        >
          <option value={"Abs"}>Abs</option>
          <option value={"Biceps"}>Biceps</option>
          <option value={"Chest"}>Chest</option>
          <option value={"Forearms"}>Forearms</option>
          <option value={"Quads"}>Quads</option>
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="fitnessLevel">
        <Form.Select
          {...register("fitnessLevel")}
          value={Exercise.fitnessLevel}
          onChange={handleChange}
        >
          <option value={1}>Very Poor</option>
          <option value={2}>Poor</option>
          <option value={3}>Average</option>
          <option value={4}>Good</option>
          <option value={5}>Excellent</option>
        </Form.Select>
      </Form.Group>
    </Form>
  );
};

export default EditExerciseForm;
