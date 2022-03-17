import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button'

const Error = () => {
    const navigate = useNavigate()
    return (
        <div>
            <Button onClick={() => navigate("/")}>To home page</Button>
            Error page
        </div>
    );
};

export default Error;