import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "./ProfileInformation.module.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useSelector } from "react-redux";


const schema = yup.object({
  first_name: yup
    .string()
    .max(20, "Maximum characters 20")
    .required("First name is required"),
  last_name: yup
    .string()
    .max(20, "Maximum characters 20")
    .required("Last name is required"),
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
  email: yup
    .string()
    .email("Email address must be valid")
    .max(100, "Maximum characters 100")
    .required("Email is required"),
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
  checkInformation: yup
    .boolean()
    .required("Please check filled information and mark box as checked"),
  requestForContributor: yup.boolean(),
});

const ProfileInformation = () => {
  const user = useSelector((state) => state.utility.user)
  const profile = useSelector((state) => state.utility.profile)
  
  let [Person, setPerson] = useState({
    first_name: user.firstName,
    last_name: user.lastName,
    address_line_1: profile.address.addressLine1,
    address_line_2: profile.address.addressLine2,
    address_line_3: profile.address.addressLine3,
    city: profile.address.city,
    country: profile.address.country,
    postal_code: profile.address.postalCode,
    email: user.email,
    height: profile.height,
    weight: profile.weight,
    medical_conditions: profile.medicalConditions,
    disabilities: profile.disabilities,
    // requestForContributor
  });
  
  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setPerson((preValue) => {
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
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <Row className="m-5">
        <Col className="col-4">
          <h2>Profile photo</h2>
          <h4>
            {Person.first_name} {Person.last_name}
          </h4>
          <p>
            {Person.address_line_1} {Person.address_line_2}{" "}
            {Person.address_line_3}
          </p>
          <p>
            {Person.city}, {Person.country}
          </p>
        </Col>
        <Col className="col-8">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <h4>Profile</h4>
            <p>You can edit information and update</p>
            <hr />
            <Row>
              <Col>
                <Form.Group
                  className={styles.profileGroup}
                  controlId="firstName"
                >
                  <FloatingLabel>First Name</FloatingLabel>
                  <Form.Control
                    className={styles.profileInput}
                    {...register("first_name")}
                    value={Person.first_name}
                    type="text"
                    onChange={handleChange}
                  ></Form.Control>
                  <p>{errors.first_name?.message}</p>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  className={styles.profileGroup}
                  controlId="lastName"
                >
                  <FloatingLabel>Last Name</FloatingLabel>
                  <Form.Control
                    className={styles.profileInput}
                    {...register("last_name")}
                    value={Person.last_name}
                    type="text"
                    onChange={handleChange}
                  ></Form.Control>
                  <p>{errors.last_name?.message}</p>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className={styles.profileGroup} controlId="address1">
              <FloatingLabel>Address</FloatingLabel>
              <Form.Control
                className={styles.profileInput}
                {...register("address_line_1")}
                value={Person.address_line_1}
                type="text"
                onChange={handleChange}
              ></Form.Control>
              <p>{errors.address_line_1?.message}</p>
            </Form.Group>
            <Row>
              <Col>
                <Form.Group
                  className={styles.profileGroup}
                  controlId="address2"
                >
                  <FloatingLabel>Address 2</FloatingLabel>
                  <Form.Control
                    className={styles.profileInput}
                    {...register("address_line_2")}
                    value={Person.address_line_2}
                    type="text"
                    onChange={handleChange}
                  ></Form.Control>
                  <p>{errors.address_line_2?.message}</p>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  className={styles.profileGroup}
                  controlId="address3"
                >
                  <FloatingLabel>Address 3</FloatingLabel>
                  <Form.Control
                    className={styles.profileInput}
                    {...register("address_line_3")}
                    value={Person.address_line_3}
                    type="text"
                    onChange={handleChange}
                  ></Form.Control>
                  <p>{errors.address_line_3?.message}</p>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group
                  className={styles.profileGroup}
                  controlId="postalCode"
                >
                  <FloatingLabel>Postal Code</FloatingLabel>
                  <Form.Control
                    className={styles.profileInput}
                    {...register("postal_code")}
                    value={Person.postal_code}
                    type="text"
                    onChange={handleChange}
                  ></Form.Control>
                  <p>{errors.postal_code?.message}</p>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className={styles.profileGroup} controlId="city">
                  <FloatingLabel>City</FloatingLabel>
                  <Form.Control
                    className={styles.profileInput}
                    {...register("city")}
                    value={Person.city}
                    type="text"
                    onChange={handleChange}
                  ></Form.Control>
                  <p>{errors.city?.message}</p>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className={styles.profileGroup} controlId="country">
                  <FloatingLabel>Country</FloatingLabel>
                  <Form.Control
                    className={styles.profileInput}
                    {...register("country")}
                    value={Person.country}
                    type="text"
                    onChange={handleChange}
                  ></Form.Control>
                  <p>{errors.country?.message}</p>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className={styles.profileGroup} controlId="email">
                  <FloatingLabel>Email address</FloatingLabel>
                  <Form.Control
                    className={styles.profileInput}
                    {...register("email")}
                    value={Person.email}
                    type="email"
                    onChange={handleChange}
                  ></Form.Control>
                  <p>{errors.email?.message}</p>
                </Form.Group>
              </Col>
            </Row>
            <hr />
            <Row>
              <h4>Medical and Physical Information</h4>
              <Col>
                <Form.Group className={styles.profileGroup} controlId="height">
                  <FloatingLabel>Height in cm</FloatingLabel>
                  <Form.Control
                    className={styles.profileInput}
                    {...register("height")}
                    value={Person.height}
                    type="number"
                    onChange={handleChange}
                  ></Form.Control>
                  <p>{errors.height?.message}</p>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className={styles.profileGroup} controlId="weight">
                  <FloatingLabel>Weight in kg</FloatingLabel>
                  <Form.Control
                    className={styles.profileInput}
                    {...register("weight")}
                    value={Person.weight}
                    type="number"
                    onChange={handleChange}
                  ></Form.Control>
                  <p>{errors.weight?.message}</p>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group
              className={styles.profileGroup}
              controlId="medicalConditions"
            >
              <FloatingLabel>Medical Conditions</FloatingLabel>
              <Form.Control
                className={styles.profileInput}
                {...register("medical_conditions")}
                as="textarea"
                value={Person.medical_conditions}
                onChange={handleChange}
              ></Form.Control>
              <p>{errors.medical_conditions?.message}</p>
            </Form.Group>
            <Form.Group
              className={styles.profileGroup}
              controlId="disabilities"
            >
              <FloatingLabel>Disabilities</FloatingLabel>
              <Form.Control
                className={styles.profileInput}
                {...register("disabilities")}
                as="textarea"
                value={Person.disabilities}
                onChange={handleChange}
              ></Form.Control>
              <p>{errors.disabilities?.message}</p>
            </Form.Group>
            <hr />
            <h4>Fitness Level</h4>
            <hr />
            <Row>
              <Form.Group controlId="requestForContributor">
                <Form.Check
                  {...register("requestForContributor")}
                  type="checkbox"
                  label="I request Contributor status"
                  
                  
                />
                <p>{errors.requestForContributor?.message}</p>
              </Form.Group>
            </Row>
            <hr />
            <Row>
              <Button type="submit" variant="primary">
                Save
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileInformation;
