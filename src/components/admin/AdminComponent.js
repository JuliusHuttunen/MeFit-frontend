import Button from "react-bootstrap/Button"
import React, { useEffect, useState } from "react"
import Table from "react-bootstrap/Table"
import { getKeycloakUsers, addContributorRole, completeContributorRequest, deleteUser } from '../API/Connection'
//import Modal from "react-bootstrap/Modal"
//import { ModalHeader } from "react-bootstrap"

const AdminComponent = () => {

    const addContributorBtn = async (id) => {
        await addContributorRole(id)
        await completeContributorRequest(id)
    }

    const deleteUserBtn = async (id) => {
        const [error, data] = await deleteUser(id)
    }

    //const [showModal, setShowModal] = useState(false)
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            const [error, data] = await getKeycloakUsers()
            setUsers(data)
        }
        fetchUsers()

    }, [])

    const UserList = users.map((user, index) => {

        return (
            <tr key={index}>
                <td>{user.username}</td>
                <td>{user.firstName + " " + user.lastName}</td>
                {user.attributes && user.attributes.contributorRequest[0] === 'true' ?
                    <td>
                        <Button type="button" onClick={() => addContributorBtn(user.id)}>Add as Contributor</Button>
                    </td> : <td></td>}

                <td>
                <Button type="button" variant="danger" onClick={() => { if(window.confirm('Are you sure you want to delete user ' + user.username + '?')) deleteUserBtn(user.id)}}>Delete</Button>
                    {/* <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}>
                        <Modal.Dialog>
                            <Modal.Header closeButton>
                                <Modal.Title>Warning</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Are you sure you want to delete this user?</p>
                                <p>{user.username}</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setShowModal(false)} >Cancel</Button>
                                <Button type="button" variant="danger" onClick={() => deleteUser(user.id)}>Delete</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal>
                    <Button type="button" variant="danger" onClick={() => setShowModal(true)}>Delete</Button> */}
                </td>
            </tr>
        )
    })

    return (
        <Table>
            <tbody>
                <tr>
                    <td>Username</td>
                    <td>Full Name</td>
                    <td>Contributor Request</td>
                    <td>Delete User</td>
                </tr>
                {UserList}
            </tbody>
        </Table>
    )
}

export default AdminComponent