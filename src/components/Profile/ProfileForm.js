import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

// Profile Form HTML + Bootstrap 
// Todo:
//      Validation
//      Errors
//      Submit...

const requiredConfig = {
  required: true,
  minLength: 2,
};

const ProfileForm = () => {

  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}
          className="m-5"
        >
          <Row className="mb-3">
            <Col>
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control {...register("firstName", requiredConfig)}
                  type="text"
                  placeholder="Enter first name"
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control  {...register("lastName", requiredConfig)}
                  type="text"
                  placeholder="Enter last name"
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group  className="mb-3" controlId="address1">
            <Form.Label>Address</Form.Label>
            <Form.Control  {...register("address1", requiredConfig)} type="text" placeholder="Street"></Form.Control>
          </Form.Group>
          <Row>
            <Col>
              <Form.Group  className="mb-3" controlId="address2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control  {...register("address2", requiredConfig)}
                  type="text"
                  placeholder="House, apartment, floor..."
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="address3">
                <Form.Label>Address 3</Form.Label>
                <Form.Control {...register("address3")}
                  type="text"
                  placeholder="
                If necessary, additional address information"
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="postalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control  {...register("postalCode", requiredConfig)}
                  type="text"
                  placeholder="Enter postal code"
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control {...register("city", requiredConfig)}
                  type="text"
                  placeholder="Enter city"
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-5">
            <Col>
              <Form.Group className="mb-3" controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control {...register("country", requiredConfig)}
                  type="text"
                  placeholder="Enter country"
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control {...register("email", requiredConfig)}
                  type="email"
                  placeholder="Enter email"
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <hr />
          <Row className="mb-5 mt-5">
            <Col>
              <Form.Group className="mb-3" controlId="height">
                <Form.Label>Height in cm</Form.Label>
                <Form.Control {...register("height", requiredConfig)}
                  type="number"
                  placeholder="Enter height in centimeters: 180.5"
                  defaultValue={150}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="weight">
                <Form.Label>Weight in kg</Form.Label>
                <Form.Control {...register("weight", requiredConfig)}
                  type="number"
                  placeholder="Enter weight in kilograms: 70.5"
                  defaultValue={60}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="medicalConditions">
            <Form.Label>Medical Conditions</Form.Label>
            <Form.Control {...register("medicalConditions")}
              as="textarea"
              placeholder="If you have any medical condition that needs attention, please let us know "
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="disabilities">
            <Form.Label>Disabilities</Form.Label>
            <Form.Control {...register("disabilities")}
              as="textarea"
              placeholder="If you have any disabilities, please let us know"
            ></Form.Control>
          </Form.Group>
          <hr />
          <Row className="mb-5">
            <Col>
              <Form.Group className="mb-5 mt-5" controlId="checkInformation">
                <Form.Check {...register("checkInformation")}
                  type="checkbox"
                  label="I have filled in and checked that the information is correct"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-5 mt-5"
                controlId="requestForContributor"
              >
                <Form.Check {...register("requestForContributor")}
                  type="checkbox"
                  label="I request Contributor status"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Button type="submit" variant="primary">Submit</Button>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default ProfileForm;