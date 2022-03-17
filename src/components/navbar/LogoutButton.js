import React from 'react';
import Button from "react-bootstrap/Button";
import KeycloakService from '../../KeycloakService';

const LogoutButton = () => {
    return (
        <div>
            <Button type="button" onClick={KeycloakService.Logout}>Log out</Button>
        </div>
    );
};

export default LogoutButton;