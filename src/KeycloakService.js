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
const AccountManagement = keycloak.accountManagement;
const getToken = () => keycloak.token;
const getId = () => keycloak.tokenParsed?.sub;
const getUsername = () => keycloak.tokenParsed?.preferred_username;
const getFirstName = () => keycloak.tokenParsed?.given_name;
const getLastName = () => keycloak.tokenParsed?.family_name;
const getEmail = () => keycloak.tokenParsed?.email;
const getRoles = () => keycloak.tokenParsed?.roles;
const requestSent = () => keycloak.tokenParsed?.contributorRequest;
const hasRole = (roles) => roles.some((role) => keycloak.hasRealmRole(role));

const isAuthenticated = () => !!keycloak.token;

const KeycloakService = {
    initKeycloak,
    Login,
    Logout,
    AccountManagement,
    getToken,
    hasRole,
    requestSent,
    getId,
    getUsername,
    getFirstName,
    getLastName,
    getEmail,
    isAuthenticated,
    getRoles,
};

export default KeycloakService;