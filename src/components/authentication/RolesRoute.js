import KeycloakService from "../..//KeycloakService";
import { Route } from "react-router-dom";

const RolesRoute = ({ roles, children, ...rest }) => (
  <Route {...rest}>{KeycloakService.hasRole(roles) ? children : null}</Route>
);

export default RolesRoute;
