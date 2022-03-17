import KeycloakService from '../../KeycloakService'

const RenderOnRole = ({ roles, children }) => {
    if (!KeycloakService.getRoles().includes(roles))
        return null;
    return children;
}

export default RenderOnRole