import KeycloakService from '../..//KeycloakService'

const RolesRoute = ({ roles, children, ...rest }) => (
    <Route { ...rest}>
        {KeycloakService.hasRole(roles) ? children : null}
    </Route>
)

export default RolesRoute