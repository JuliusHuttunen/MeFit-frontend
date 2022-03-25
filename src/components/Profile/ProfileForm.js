import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { postProfileToAPI } from "../API/Connection";
import { useNavigate } from "react-router-dom";
import { fetchProfile } from "../../redux/profileSlice";
import { useDispatch } from "react-redux";

// yup validation schema
const schema = yup.object({
  address_line_1: yup
    .string()
    .max(100, "Maximum characters 100")
    .required("Street is required"),
  address_line_2: yup
    .string()
    .max(100, "Maximum characters 100")
    .required("House or apartment is required"),
  address_line_3: yup.string().max(100, "Maximum characters 100"),
  city: yup
    .string()
    .max(60, "Maximum characters 60")
    .required("City is required"),
  country: yup
    .string()
    .max(60, "Maximum characters 60")
    .required("Country is required"),
  postal_code: yup
    .string()
    .max(10, "Maximum characters 10")
    .required("Postal code is required"),
  height: yup
    .number()
    .typeError("Height must be given as a number")
    .positive("Height must be a positive number")
    .required("Height is required"),
  weight: yup
    .number()
    .typeError("Weight must be given as a number")
    .positive("Weight must be a positive number")
    .required("Weight is required"),
  medical_conditions: yup.string().max(255, "Maximum characters 100"),
  disabilities: yup.string().max(255, "Maximum characters 100"),
  fitness_level: yup.number().nullable().required("Fitness Level is required"),
  checkInformation: yup
    .boolean()
    .required("Please check filled information and mark box as checked"),
});

const ProfileForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    await postProfileToAPI(data);
    await dispatch(fetchProfile()).unwrap()
    console.log("Profile created")
     navigate("/dashboard")
  };

  return (
    <>
      <Container className="p-3">
        <Form onSubmit={handleSubmit(onSubmit)} className="m-5">
          <h4>Welcome to MeFit!</h4>
          <p>
            Please fill out the form carefully and we will be able to create
            your MeFit-Profile.
          </p>
          <Form.Group className="mb-3" controlId="address1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              {...register("address_line_1")}
              type="text"
              placeholder="Street"
            ></Form.Control>
            <p>{errors.address_line_1?.message}</p>
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="address2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control
                  {...register("address_line_2")}
                  type="text"
                  placeholder="House, apartment, floor..."
                ></Form.Control>
                <p>{errors.address_line_2?.message}</p>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="address3">
                <Form.Label>Address 3</Form.Label>
                <Form.Control
                  {...register("address_line_3")}
                  type="text"
                  placeholder="
                If necessary, additional address information"
                ></Form.Control>
                <p>{errors.address_line_3?.message}</p>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="postalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  {...register("postal_code")}
                  type="text"
                  placeholder="Enter postal code"
                ></Form.Control>
                <p>{errors.postal_code?.message}</p>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  {...register("city")}
                  type="text"
                  placeholder="Enter city"
                ></Form.Control>
                <p>{errors.city?.message}</p>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  {...register("country")}
                  type="text"
                  placeholder="Enter country"
                ></Form.Control>
                <p>{errors.country?.message}</p>
              </Form.Group>
            </Col>
          </Row>
          <hr />
          <Row>
            <h4 className="mb-4">Medical and Physical Information</h4>
            <Col>
              <Form.Group className="mb-3" controlId="height">
                <Form.Label>Height in cm</Form.Label>
                <Form.Control
                  {...register("height")}
                  type="number"
                  placeholder="Enter height in centimeters: 180.5"
                  defaultValue={150}
                ></Form.Control>
                <p>{errors.height?.message}</p>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="weight">
                <Form.Label>Weight in kg</Form.Label>
                <Form.Control
                  {...register("weight")}
                  type="number"
                  placeholder="Enter weight in kilograms: 70.5"
                  defaultValue={60}
                ></Form.Control>
                <p>{errors.weight?.message}</p>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="medicalConditions">
            <Form.Label>Medical Conditions</Form.Label>
            <Form.Control
              {...register("medical_conditions")}
              as="textarea"
              placeholder="If you have any medical condition that needs attention, please let us know "
            ></Form.Control>
            <p>{errors.medical_conditions?.message}</p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="disabilities">
            <Form.Label>Disabilities</Form.Label>
            <Form.Control
              {...register("disabilities")}
              as="textarea"
              placeholder="If you have any disabilities, please let us know"
            ></Form.Control>
            <p>{errors.disabilities?.message}</p>
          </Form.Group>
          <hr />
          <h4 className="mb-4">
            Training Habits and Current Condition Information
          </h4>
          <Form.Group className="mb-5 mt-3" controlId="fitness_level">
            <Form.Check
              {...register("fitness_level")}
              inline
              type="radio"
              label="Very Poor"
              value={1}
            />
            <Form.Check
              {...register("fitness_level")}
              inline
              type="radio"
              label="Poor"
              value={2}
            />
            <Form.Check
              {...register("fitness_level")}
              inline
              type="radio"
              label="Average"
              value={3}
            />
            <Form.Check
              {...register("fitness_level")}
              inline
              type="radio"
              label="Good"
              value={4}
            />
            <Form.Check
              {...register("fitness_level")}
              inline
              type="radio"
              label="Excellent"
              value={5}
            />
            <p>{errors.fitness_level?.message}</p>
          </Form.Group>
          <hr />
          <Row className="mb-5">
            <Col>
              <Form.Group className="mb-5 mt-3" controlId="checkInformation">
                <Form.Check
                  {...register("checkInformation")}
                  type="checkbox"
                  label="I have filled in and checked that the information is correct"
                  required
                />
                <p>{errors.checkInformation?.message}</p>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default ProfileForm;
