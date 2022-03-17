import KeycloakService from '../../KeycloakService'

const RenderOnRole = ({ roles, children }) => {
    if (!KeycloakService.hasRole(roles))
        return null;
    return children;
}

export default RenderOnRole