import React from 'react';
import AdminComponent from '../components/admin/AdminComponent'
import Container from 'react-bootstrap/Container';

const Admin = () => {
    return (
        <Container className='p-3'>
            <AdminComponent/>
        </Container>
    );
};

export default Admin;