import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import KeycloakService from "../../KeycloakService";
import { fetchProfile } from "../../redux/utilitySlice";
import { useDispatch } from "react-redux";


const LoginForm = () => {

  return (
    <Form>
      <Row>
        <Col sm="3" className="d-grid">
          <Button type="button" variant="secondary" onClick={KeycloakService.Login}>Login</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default LoginForm;
