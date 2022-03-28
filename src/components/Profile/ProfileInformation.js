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
import { useDispatch, useSelector } from "react-redux";
import KeycloakService from "../../KeycloakService";
import { updateProfileToAPI, requestContributorRole } from "../API/Connection";
import { fetchProfile } from "../../redux/profileSlice";
import { contributorRequest } from "../../redux/profileSlice";

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
  fitness_level: yup.number().required("Fitness Level is required"),
});

// User and profile data
const ProfileInformation = () => {
  const profile = useSelector((state) => state.profile);

  let [Person, setPerson] = useState({
    first_name: KeycloakService.getFirstName(),
    last_name: KeycloakService.getLastName(),
    address_line_1: profile.address.addressLine_1,
    address_line_2: profile.address.addressLine_2,
    address_line_3: profile.address.addressLine_3,
    city: profile.address.city,
    country: profile.address.country,
    postal_code: profile.address.postalCode,
    email: KeycloakService.getEmail(),
    height: profile.height,
    weight: profile.weight,
    fitness_level: profile.fitnessLevel,
    medical_conditions: profile.medicalConditions,
    disabilities: profile.disabilities,
  });

  const contributorRequestStatus = useSelector(
    (state) => state.profile.hasSentContributorRequest
  );

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

  const dispatch = useDispatch();

  const requestContributor = async () => {
    if (!KeycloakService.getRoles().includes("contributor")) {
      await requestContributorRole();
      dispatch(contributorRequest());
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    await updateProfileToAPI(data);
    await dispatch(fetchProfile()).unwrap();
    console.log("Profile updated");
  };

  return (
    <Container className="p-3">
      <Row className="m-3">
        <Col name="user-col" md={2}>
          <Row>
            <h4>
              {Person.first_name} {Person.last_name}
            </h4>
          </Row>
          <Row>
            <p>{Person.email}</p>
          </Row>
          {KeycloakService.getRoles().includes("contributor") ? (
            <Row>
              <p>Contributor</p>
            </Row>
          ) : (
            <></>
          )}
          <Row className="mt-3">
            <Button
              onClick={() =>
                window.open(
                  "https://fi-java-mefit-keycloak.herokuapp.com/auth/realms/mefit/account/#/personal-info",
                  "_blank"
                )
              }
              variant="primary"
            >
              Edit User account
            </Button>
          </Row>
          <Row className="mt-4 mb-4">
            <Button
              onClick={() =>
                window.open(
                  "https://fi-java-mefit-keycloak.herokuapp.com/auth/realms/mefit/account/#/security/signingin",
                  "_blank"
                )
              }
              variant="secondary"
            >
              Edit password
            </Button>
          </Row>
          <Row className="mt-4 mb-4">
            {!KeycloakService.getRoles().includes("contributor") ? (
              KeycloakService.requestSent() === "true" ||
              contributorRequestStatus ? (
                <Button disabled variant="secondary">
                  Contributor Request pending
                </Button>
              ) : (
                <Button onClick={requestContributor} variant="secondary">
                  Request Contributor Role
                </Button>
              )
            ) : (
              <></>
            )}
          </Row>
        </Col>
        <Col name="profile-col" md={{ span: 8, offset: 2 }}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <h4>Profile</h4>
            <p>You can edit information and update</p>
            <hr />
            <Row>
              <Col>
                <Form.Group
                  className={styles.profileGroup}
                  controlId="profile_address1"
                >
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
              </Col>
              <Col>
                <Form.Group
                  className={styles.profileGroup}
                  controlId="profile_address2"
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
            </Row>
            <Row>
              <Col>
                <Form.Group
                  className={styles.profileGroup}
                  controlId="profile_address3"
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
              <Col>
                <Form.Group
                  className={styles.profileGroup}
                  controlId="profile_postalCode"
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
            </Row>
            <Row>
              <Col>
                <Form.Group
                  className={styles.profileGroup}
                  controlId="profile_city"
                >
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
              <Col>
                <Form.Group
                  className={styles.profileGroup}
                  controlId="profile_country"
                >
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
            </Row>
            <hr />
            <Row>
              <h5>Medical and Physical Information</h5>
              <Col>
                <Form.Group
                  className={styles.profileGroup}
                  controlId="profile_height"
                >
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
                <Form.Group
                  className={styles.profileGroup}
                  controlId="profile_weight"
                >
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
              controlId="profile_medicalConditions"
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
              controlId="profile_disabilities"
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
            <h5>Fitness Level</h5>
            <Form.Group controlId="profile_fitness_level">
              <Form.Select
                className={styles.profileInput}
                {...register("fitness_level")}
                value={Person.fitness_level}
                onChange={handleChange}
              >
                <option value={1}>Very Poor</option>
                <option value={2}>Poor</option>
                <option value={3}>Average</option>
                <option value={4}>Good</option>
                <option value={5}>Excellent</option>
              </Form.Select>
              <p>{errors.fitness_level?.message}</p>
            </Form.Group>
            <hr />
            <Row>
              <Button name="update-profile" type="submit" variant="primary">
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
