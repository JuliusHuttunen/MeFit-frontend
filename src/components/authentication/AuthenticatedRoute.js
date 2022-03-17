import { Route } from 'react-router-dom'
import KeycloakService from '../..//KeycloakService'

const AuthenticatedRoute = ({children, ...rest}) => (
    <Route {...rest}>
        {KeycloakService.isAuthenticated() ? children : null};
    </Route>
)

export default AuthenticatedRoute
