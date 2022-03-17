import Keycloak from "keycloak-js";

const keycloak = new Keycloak('/keycloak.json');

const initKeycloak = (renderApp) => {
    keycloak.init({
        onLoad: 'check-sso'
    })
    .then(() => {
            renderApp();
    })
};

const Login = keycloak.login;
const Logout = keycloak.logout;
const getToken = () => keycloak.token;
const getId = () => keycloak.tokenParsed?.sub;
const getUsername = () => keycloak.tokenParsed?.preferred_username;
const getFirstName = () => keycloak.tokenParsed?.given_name;
const getLastName = () => keycloak.tokenParsed?.family_name;
const getEmail = () => keycloak.tokenParsed?.email;
const getRoles = () => keycloak.tokenParsed?.roles;
const hasRole = (roles) => roles.some((role) => keycloak.hasRealmRole(role));

const isAuthenticated = () => !!keycloak.token;

const KeycloakService = {
    initKeycloak,
    Login,
    Logout,
    getToken,
    hasRole,
    getId,
    getUsername,
    getFirstName,
    getLastName,
    getEmail,
    isAuthenticated,
    getRoles,
};

export default KeycloakService;