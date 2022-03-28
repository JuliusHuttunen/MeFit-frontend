import KeycloakService from "../../KeycloakService";

export default function Authenticated({ children }) {
    if (KeycloakService.isAuthenticated())
        return children;
    return null;
}